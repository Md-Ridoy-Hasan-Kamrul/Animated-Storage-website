import {
  BT_FS,
  CARD_H,
  CARD_W,
  CONTENT_H,
  HERO_FS,
  LAND_MIN_PX,
  MODE_LAND,
  MODE_PHONE,
  MODE_TABPORT,
  PANE_W,
  PHOTO_COL_DESKTOP,
  PHOTO_MIN,
  PHOTO_MIN2,
  PHOTO_W,
  REF_H,
  REF_W,
} from '../constants';
import { entranceFrom, entranceTo } from '../utils/entrance';
import { resolveLayoutMode } from '../utils/layoutMode';
import { landPass, phonePass } from '../utils/layoutPass';
import { photoRatio } from '../utils/photoRatio';
import { placeCard } from '../utils/placeCard';
import { camelToKebab, headlineWrapWidth } from '../utils/tpVars';

describe('Signal photo ramp', () => {
  it('holds 836/1464 at desktop and eases to 0.42 then 0.36', () => {
    expect(photoRatio(1464)).toBeCloseTo(PHOTO_COL_DESKTOP);
    expect(photoRatio(1280)).toBeCloseTo(1 - PANE_W / REF_W);
    expect(photoRatio(1000)).toBeCloseTo(PHOTO_MIN);
    expect(photoRatio(820)).toBeCloseTo(PHOTO_MIN2);
    expect(photoRatio(1140)).toBeGreaterThan(PHOTO_MIN);
    expect(photoRatio(1140)).toBeLessThan(PHOTO_COL_DESKTOP);
  });
});

describe('Signal card seating', () => {
  it('reproduces the 1464×949 reference card', () => {
    const paneW = REF_W - PHOTO_W;
    const card = placeCard(paneW, REF_H);
    expect(paneW).toBe(PANE_W);
    expect(card.cs).toBe(1);
    expect(card.cw).toBe(CARD_W);
    expect(card.ch).toBe(CARD_H);
    expect(card.ch).toBe(REF_H - 14 - 13);
    expect(CONTENT_H).toBe(697);
  });
});

describe('Signal layout modes', () => {
  it('uses land, tabport, and phone from width and aspect', () => {
    expect(resolveLayoutMode(1464, 949)).toBe(MODE_LAND);
    expect(resolveLayoutMode(800, 1200)).toBe(MODE_TABPORT);
    expect(resolveLayoutMode(390, 844)).toBe(MODE_PHONE);
    expect(390).toBeLessThan(LAND_MIN_PX);
    expect(resolveLayoutMode(390, 844, { framed: true })).toBe(MODE_LAND);
  });

  it('writes land photo width and an empty phone pass', () => {
    const land = landPass(1464, 949);
    expect(parseFloat(land.photo.width)).toBeCloseTo(PHOTO_COL_DESKTOP * 100);
    expect(Number(land.cardIn.transform.match(/scale\(([^)]+)\)/)[1])).toBeCloseTo(1);
    expect(phonePass().mode).toBe(MODE_PHONE);
    expect(phonePass().card).toEqual({});
  });
});

describe('Signal tablet tokens', () => {
  it('keeps both btFs and heroFs and kebab-cases TP keys', () => {
    expect(BT_FS).toBe(0.02876);
    expect(HERO_FS).toBe(0.1058);
    expect(camelToKebab('h1Top')).toBe('--tp-h1-top');
    expect(camelToKebab('heroFs')).toBe('--tp-hero-fs');
    expect(headlineWrapWidth(1000)).toBe(610);
  });
});

describe('Signal entrance frames', () => {
  it('clips headlines and scales the card on desktop', () => {
    expect(entranceFrom('card', false).transform).toBe('translateY(12px) scale(.988)');
    expect(entranceFrom('card', true).transform).toBe('translateY(14px)');
    expect(entranceFrom('headline', false).clipPath).toBe('inset(100% 0 0 0)');
    expect(entranceTo('headline').clipPath).toBe('inset(0 0 0 0)');
  });
});
