import { MODE_LAND, MODE_PHONE, MODE_TABPORT } from '../constants';
import { bodyModeClass } from './layoutMode';
import { cardInTransform, placeCard } from './placeCard';
import { photoRatio } from './photoRatio';
import { seatHero } from './seatHero';
import { buildTpVars, headlineWrapWidth, tabportMetrics } from './tpVars';

export function landPass(vw, vh) {
  const ratio = photoRatio(vw);
  const photoW = ratio * vw;
  const paneW = vw - photoW;
  const card = placeCard(paneW, vh);
  return {
    mode: MODE_LAND,
    photo: {
      left: '0px',
      top: '0px',
      width: `${ratio * 100}%`,
      height: '100%',
    },
    pane: {
      left: `${ratio * 100}%`,
      right: '0px',
      top: '0px',
      bottom: '0px',
    },
    card: {
      left: `${card.gapL}px`,
      top: `${card.mT}px`,
      width: `${card.cw}px`,
      height: `${card.ch}px`,
      borderRadius: `${card.radius}px`,
      borderWidth: `${card.border}px`,
    },
    cardIn: {
      transform: cardInTransform(card),
    },
    hero: {
      transform: `scale(${seatHero(photoW, vh)})`,
      transformOrigin: 'left bottom',
      bottom: '0px',
    },
    vars: { '--cs': String(card.cs) },
  };
}

export function tabportPass(vw, vh, measuredHeadline = 0) {
  const metrics = tabportMetrics(vw, vh);
  const cardW = vw;
  const cardH = Math.max(0, vh - metrics.band - metrics.footer);
  const vars = buildTpVars(cardW, cardH, metrics.band);
  vars['--hl-wrap'] = `${headlineWrapWidth(measuredHeadline)}px`;
  return {
    mode: MODE_TABPORT,
    photo: {
      width: '100%',
      height: `${metrics.band}px`,
      left: '0px',
      top: '0px',
    },
    pane: {
      left: '0px',
      right: '0px',
      top: `${metrics.band}px`,
      bottom: `${metrics.footer}px`,
    },
    card: {
      left: `${metrics.side}px`,
      right: `${metrics.side}px`,
      top: '0px',
      width: `calc(100% - ${metrics.side * 2}px)`,
      height: '100%',
    },
    cardIn: {
      inset: '0px',
      transform: 'none',
    },
    hero: {
      transform: 'none',
    },
    vars,
  };
}

export function phonePass() {
  return {
    mode: MODE_PHONE,
    photo: {},
    pane: {},
    card: {},
    cardIn: {},
    hero: {},
    vars: {},
  };
}

export function assignStyles(node, styles) {
  if (!node) return;
  Object.entries(styles).forEach(([key, value]) => {
    node.style[key] = value;
  });
}

export function assignVars(target, vars) {
  if (!target) return;
  Object.entries(vars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
}

export function syncBodyMode(mode) {
  const { body } = document;
  body.classList.remove(bodyModeClass(MODE_TABPORT), bodyModeClass(MODE_PHONE));
  const next = bodyModeClass(mode);
  if (next) body.classList.add(next);
}
