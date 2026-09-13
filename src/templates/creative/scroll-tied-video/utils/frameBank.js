import { BANK_FLUSH_MS, BANK_POLL_MS, LEAD, WEBP_QUALITY } from '../constants';

function readDescription(file, trackId, DataStream) {
  const trak = file.getTrackById?.(trackId);
  const entries = trak?.mdia?.minf?.stbl?.stsd?.entries || [];
  return entries.reduce((found, entry) => {
    if (found) return found;
    const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
    if (!box || !DataStream) return found;
    const stream = new DataStream(undefined, 0, DataStream.BIG_ENDIAN);
    box.write(stream);
    return new Uint8Array(stream.buffer, 8);
  }, null);
}

async function frameToBlob(frame) {
  const canvas = new OffscreenCanvas(frame.displayWidth, frame.displayHeight);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(frame, 0, 0);
  frame.close();
  return canvas.convertToBlob({ type: 'image/webp', quality: WEBP_QUALITY });
}

function configureDecoder(config, output, error) {
  const decoder = new VideoDecoder({ output, error });
  try {
    decoder.configure(config);
    return decoder;
  } catch {
    decoder.configure({ ...config, hardwareAcceleration: 'prefer-software' });
    return decoder;
  }
}

export async function fetchVideoBuffer(urls) {
  const errors = [];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.arrayBuffer();
      errors.push(`${url}: ${response.status}`);
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }
  throw new Error(errors.join('; ') || 'video fetch failed');
}

export async function loadMp4Box() {
  try {
    const mod = await import('mp4box');
    return {
      createFile: mod.createFile || mod.default?.createFile || null,
      DataStream: mod.DataStream || mod.default?.DataStream || null,
    };
  } catch {
    return { createFile: null, DataStream: null };
  }
}

export function canBuildFrameBank() {
  if (typeof window === 'undefined') return false;
  if (typeof VideoDecoder === 'undefined') return false;
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
}

export async function buildFrameBank(urls, { signal } = {}) {
  if (!canBuildFrameBank()) return [];
  const { createFile, DataStream } = await loadMp4Box();
  if (!createFile) return [];

  const buffer = await fetchVideoBuffer(urls);
  if (signal?.aborted) return [];
  buffer.fileStart = 0;

  return new Promise((resolve) => {
    const file = createFile();
    const bank = [];
    let pending = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      resolve(bank.slice().sort((a, b) => a.ts - b.ts));
    };

    const output = (frame) => {
      pending += 1;
      const ts = frame.timestamp;
      frameToBlob(frame)
        .then((blob) => {
          bank.push({ ts, blob });
        })
        .catch(() => {})
        .finally(() => {
          pending -= 1;
        });
    };

    file.onError = () => finish();
    file.onReady = (info) => {
      const track = info.videoTracks?.[0];
      if (!track) {
        finish();
        return;
      }
      const config = {
        codec: track.codec,
        codedWidth: track.video.width,
        codedHeight: track.video.height,
        description: readDescription(file, track.id, DataStream) || undefined,
      };
      let decoder;
      try {
        decoder = configureDecoder(config, output, () => finish());
      } catch {
        finish();
        return;
      }

      let inflight = 0;
      file.onSamples = (_id, _user, samples) => {
        samples.forEach((sample) => {
          if (signal?.aborted) return;
          if (inflight - bank.length > LEAD) return;
          inflight += 1;
          try {
            decoder.decode(
              new EncodedVideoChunk({
                type: sample.is_sync ? 'key' : 'delta',
                timestamp: (sample.cts * 1e6) / sample.timescale,
                duration: (sample.duration * 1e6) / sample.timescale,
                data: sample.data,
              }),
            );
          } catch {
            /* skip sample */
          }
        });
      };

      file.setExtractionOptions(track.id);
      file.start();
    };

    try {
      file.appendBuffer(buffer);
      file.flush();
    } catch {
      finish();
      return;
    }

    window.setTimeout(() => {
      if (!bank.length) {
        finish();
        return;
      }
      const wait = window.setInterval(() => {
        if (pending === 0) {
          window.clearInterval(wait);
          finish();
        }
      }, BANK_POLL_MS);
    }, BANK_FLUSH_MS);
  });
}
