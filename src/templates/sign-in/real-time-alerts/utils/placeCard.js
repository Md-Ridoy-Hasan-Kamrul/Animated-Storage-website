import {
  CARD_GAP_L,
  CARD_H,
  CARD_MARGIN_BOTTOM,
  CARD_MARGIN_RIGHT,
  CARD_MARGIN_TOP,
  CARD_RADIUS,
  CARD_W,
  CONTENT_H,
  PANE_W,
} from '../constants';

export function placeCard(paneW, vh) {
  const cs = Math.min(paneW / PANE_W, vh / CONTENT_H);
  const gapL = CARD_GAP_L * cs;
  const mT = CARD_MARGIN_TOP * cs;
  const mB = CARD_MARGIN_BOTTOM * cs;
  const mR = CARD_MARGIN_RIGHT * cs;
  const cw = Math.max(CARD_W * cs, paneW - gapL - mR);
  const ch = vh - mT - mB;
  return {
    cs,
    gapL,
    mT,
    mB,
    mR,
    cw,
    ch,
    radius: CARD_RADIUS * cs,
    border: Math.max(1, cs),
    inX: (cw - CARD_W * cs) / 2,
  };
}

export function cardInTransform(card) {
  return `translate(${card.inX}px,0) scale(${card.cs})`;
}
