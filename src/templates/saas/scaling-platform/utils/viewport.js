import { MOBILE_MAX_PX } from '../constants';

export function isMobileWidth(width, maxPx = MOBILE_MAX_PX) {
  return Number(width) <= maxPx;
}

export function headlineClass(line) {
  const indent = line?.indent ? ' sp-headline-indent' : '';
  const accent = line?.accent ? ' sp-headline-accent' : '';
  return `sp-headline-line${indent}${accent}`;
}
