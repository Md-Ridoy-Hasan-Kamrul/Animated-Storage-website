import { useEffect } from 'react';
import {
  BOOT_TIMEOUT_MS,
  FETCH_BAIL_MS,
  FETCH_FALLBACK_CAP,
  FETCH_SIZE_FALLBACK,
  VIDEO_URL,
} from '../constants';
import { HERO_VIDEO_LOCAL } from '../content';
import { formatBootLabel } from '../utils/scrubMath';

async function readBlobWithProgress(res, onProgress) {
  if (!res.ok || !res.body) throw new Error('Video fetch failed');
  const total = Number(res.headers.get('content-length')) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let got = 0;

  const pump = async () => {
    const result = await reader.read();
    if (result.done) return;
    chunks.push(result.value);
    got += result.value.length;
    onProgress(total ? got / total : Math.min(got / FETCH_SIZE_FALLBACK, FETCH_FALLBACK_CAP));
    await pump();
  };

  await pump();
  return new Blob(chunks, { type: 'video/mp4' });
}

export function useClipPreload(clipRef, { onDuration, onReady, bootBarRef, bootPctRef }) {
  useEffect(() => {
    const clip = clipRef.current;
    if (!clip) return undefined;

    let attached = false;
    let started = false;
    let objectUrl = '';
    let bootTimer = 0;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;

    const setProgress = (fraction) => {
      if (bootBarRef.current) {
        bootBarRef.current.style.transform = `scaleX(${fraction})`;
      }
      if (bootPctRef.current) {
        bootPctRef.current.textContent = formatBootLabel(fraction);
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      onReady();
    };

    const attach = (src) => {
      if (attached || !clip) return;
      attached = true;
      clip.addEventListener('loadedmetadata', () => {
        onDuration(clip.duration || 0);
        clip.pause();
      });
      clip.addEventListener('loadeddata', start);
      clip.addEventListener('canplaythrough', start);
      clip.addEventListener('error', start);
      clip.src = src;
      clip.load();
      bootTimer = window.setTimeout(start, BOOT_TIMEOUT_MS);
    };

    const bail = window.setTimeout(() => {
      controller?.abort();
      setProgress(1);
      attach(HERO_VIDEO_LOCAL);
    }, FETCH_BAIL_MS);

    const load = async (url) => {
      const res = await fetch(url, { signal: controller?.signal });
      const blob = await readBlobWithProgress(res, setProgress);
      window.clearTimeout(bail);
      setProgress(1);
      objectUrl = URL.createObjectURL(blob);
      attach(objectUrl);
    };

    load(VIDEO_URL)
      .catch(() => load(HERO_VIDEO_LOCAL))
      .catch(() => {
        window.clearTimeout(bail);
        setProgress(1);
        attach(HERO_VIDEO_LOCAL);
      });

    return () => {
      window.clearTimeout(bail);
      window.clearTimeout(bootTimer);
      controller?.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [bootBarRef, bootPctRef, clipRef, onDuration, onReady]);
}
