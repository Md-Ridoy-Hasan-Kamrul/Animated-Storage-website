import {
  ASPECT_LAND_H,
  ASPECT_LAND_W,
  BODY_STACKED,
  BODY_TABPORT,
  LAND_MIN_PX,
  MODE_LAND,
  MODE_PHONE,
  MODE_TABPORT,
} from '../constants';

export function resolveLayoutMode(width, height, { framed = false } = {}) {
  if (framed) return MODE_LAND;
  if (width < LAND_MIN_PX) return MODE_PHONE;
  const landscape = width / height >= ASPECT_LAND_W / ASPECT_LAND_H;
  return landscape ? MODE_LAND : MODE_TABPORT;
}

export function bodyModeClass(mode) {
  if (mode === MODE_TABPORT) return BODY_TABPORT;
  if (mode === MODE_PHONE) return BODY_STACKED;
  return '';
}

export function clearInline(nodes) {
  nodes.forEach((node) => {
    if (node) node.style.cssText = '';
  });
}
