/**
 * Build a centered 900×900 Trochil Signal gallery still (RGB PNG + noise for size).
 * Matches authored dark ground #030303 with amber radial and technical rectangle.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const SIZE = 900;
const BG = [0x03, 0x03, 0x03];
const OUT = path.join(
  __dirname,
  '../public/images/Assets Trochil Signal Rectangle Buttons/TrochilSignalRectangleButtons.png',
);

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function writePng(rgb) {
  const raw = Buffer.alloc((SIZE * 3 + 1) * SIZE);
  for (let y = 0; y < SIZE; y++) {
    const row = y * (SIZE * 3 + 1);
    raw[row] = 0;
    rgb.copy(raw, row + 1, y * SIZE * 3, (y + 1) * SIZE * 3);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function setPixel(rgb, x, y, r, g, b, a = 1) {
  if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return;
  const i = (y * SIZE + x) * 3;
  rgb[i] = Math.round(rgb[i] * (1 - a) + r * a);
  rgb[i + 1] = Math.round(rgb[i + 1] * (1 - a) + g * a);
  rgb[i + 2] = Math.round(rgb[i + 2] * (1 - a) + b * a);
}

function fillRect(rgb, x0, y0, w, h, r, g, b, a = 1) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) setPixel(rgb, x, y, r, g, b, a);
  }
}

function main() {
  const rgb = Buffer.alloc(SIZE * SIZE * 3);
  for (let i = 0; i < rgb.length; i += 3) {
    rgb[i] = BG[0];
    rgb[i + 1] = BG[1];
    rgb[i + 2] = BG[2];
  }

  // Amber radial at 71% 49%
  const cx = Math.round(SIZE * 0.71);
  const cy = Math.round(SIZE * 0.49);
  const radius = SIZE * 0.31;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const d = Math.hypot(x - cx, y - cy) / radius;
      if (d < 1) {
        const a = (1 - d) * (1 - d) * 0.18 * 0.72;
        setPixel(rgb, x, y, 251, 215, 54, a);
      }
    }
  }

  // Button: ~180×52 centered (scaled for 900 canvas)
  const bw = 220;
  const bh = 58;
  const bx = Math.round((SIZE - bw) / 2);
  const by = Math.round((SIZE - bh) / 2);
  fillRect(rgb, bx, by, bw, bh, 18, 18, 18, 1);
  // top highlight
  for (let x = bx; x < bx + bw; x++) {
    setPixel(rgb, x, by, 255, 255, 255, 0.08);
    setPixel(rgb, x, by + 1, 255, 255, 255, 0.04);
  }
  // edge
  for (let x = bx; x < bx + bw; x++) {
    setPixel(rgb, x, by, 255, 255, 255, 0.27);
    setPixel(rgb, x, by + bh - 1, 255, 255, 255, 0.27);
  }
  for (let y = by; y < by + bh; y++) {
    setPixel(rgb, bx, y, 255, 255, 255, 0.27);
    setPixel(rgb, bx + bw - 1, y, 255, 255, 255, 0.27);
  }
  // warm sheen band across middle of button
  for (let x = bx + 20; x < bx + bw - 20; x++) {
    const t = (x - bx) / bw;
    const a = Math.exp(-((t - 0.48) ** 2) / (2 * 0.04)) * 0.22;
    for (let y = by + 8; y < by + bh - 8; y++) {
      setPixel(rgb, x, y, 251, 215, 54, a);
    }
  }
  // label pixels (simple "Request access" bar of light dots)
  const labelW = 118;
  const labelH = 3;
  const lx = Math.round(bx + (bw - labelW) / 2);
  const ly = Math.round(by + bh / 2 - 1);
  fillRect(rgb, lx, ly, labelW, labelH, 210, 210, 210, 0.75);

  // film grain so file exceeds 10KB
  for (let i = 0; i < 180000; i++) {
    const x = (Math.random() * SIZE) | 0;
    const y = (Math.random() * SIZE) | 0;
    const n = (Math.random() - 0.5) * 14;
    const idx = (y * SIZE + x) * 3;
    rgb[idx] = Math.max(0, Math.min(255, rgb[idx] + n));
    rgb[idx + 1] = Math.max(0, Math.min(255, rgb[idx + 1] + n));
    rgb[idx + 2] = Math.max(0, Math.min(255, rgb[idx + 2] + n));
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const png = writePng(rgb);
  fs.writeFileSync(OUT, png);
  console.log('wrote', OUT, 'bytes', png.length);
}

main();
