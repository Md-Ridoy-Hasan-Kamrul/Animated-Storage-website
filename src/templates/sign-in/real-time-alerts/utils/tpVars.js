import {
  BADGE_BAND_RATIO,
  BADGE_REF_H,
  BAND_VH,
  FOOTER_VH,
  HEADLINE_WRAP_RATIO,
  REF_CARD_ASPECT,
  SIDE_VW,
  TP,
  TP_BAND_KEYS,
  TP_HEIGHT_KEYS,
  TP_UNITLESS_KEYS,
  TP_WIDTH_KEYS,
} from '../constants';

export function camelToKebab(key) {
  return `--tp-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export function tpAxis(key) {
  if (TP_WIDTH_KEYS.includes(key)) return 'cardW';
  if (TP_BAND_KEYS.includes(key)) return 'band';
  if (TP_HEIGHT_KEYS.includes(key)) return 'cardH';
  return 'S';
}

export function tabportMetrics(vw, vh) {
  const band = Math.round(vh * BAND_VH);
  return {
    band,
    side: Math.round(vw * SIDE_VW),
    footer: Math.round(vh * FOOTER_VH),
    badgeK: (band * BADGE_BAND_RATIO) / BADGE_REF_H,
  };
}

export function headlineWrapWidth(measured) {
  return Math.round(measured * HEADLINE_WRAP_RATIO);
}

export function buildTpVars(cardW, cardH, band) {
  const S = Math.min(cardH, cardW * REF_CARD_ASPECT);
  const bases = { cardW, cardH, band, S };
  const vars = {};
  Object.entries(TP).forEach(([key, factor]) => {
    if (TP_UNITLESS_KEYS.includes(key)) {
      vars[camelToKebab(key)] = String(factor);
      return;
    }
    vars[camelToKebab(key)] = `${factor * bases[tpAxis(key)]}px`;
  });
  vars['--tp-hero-b'] = vars['--tp-hero-bot'];
  vars['--badge-k'] = String((band * BADGE_BAND_RATIO) / BADGE_REF_H);
  vars['--band-h'] = `${band}px`;
  return vars;
}
