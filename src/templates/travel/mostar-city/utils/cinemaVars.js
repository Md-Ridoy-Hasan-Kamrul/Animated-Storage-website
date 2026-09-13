import {
  BACK_OPACITY_FRAME2,
  BACK_PARALLAX_X,
  BACK_PARALLAX_Y,
  BACK_SCALE_BASE,
  BACK_SCALE_FRAME2,
  BACK_SCALE_FRAME3,
  BACK_SCALE_PROGRESS,
  BAZAAR_FRAME3_BRIGHTNESS,
  BAZAAR_SATURATION_GAIN,
  BAZAAR_Y_BASE,
  BAZAAR_Y_PROGRESS,
  BLUR_PX_MAX,
  BRIDGE_BOTTOM_BASE,
  BRIDGE_BOTTOM_ENTER,
  BRIDGE_EXIT_Y,
  BRIDGE_MOUSE_X,
  BRIDGE_MOUSE_Y,
  BRIDGE_SCALE_BASE,
  BRIDGE_SCALE_EXIT,
  BRIDGE_WIDTH_BASE,
  BRIDGE_WIDTH_ENTER,
  BRIGHTNESS_DROP,
  FOUR_SCALE_BASE,
  FOUR_SCALE_PROGRESS,
  FOUR_Y_BASE,
  FOUR_Y_PROGRESS,
  FRAME2_A,
  FRAME2_B,
  FRAME2_C,
  FRAME2_D,
  FRAME2_EXIT_Y,
  FRAME2_MOUSE_X,
  FRAME2_MOUSE_Y,
  FRAME2_SCALE_BASE,
  FRAME2_SCALE_STEP,
  FRAME3_A,
  FRAME3_B,
  FRAME3_C,
  FRAME3_D,
  INTRO_COPY_SINK,
  INTRO_EXIT_END,
  INTRO_EXIT_START,
  MX_DECIMALS,
  PANEL_ENTER_Y,
  PANEL_EXIT_Y,
  PROGRESS_SPAN,
  SHADE_BOTTOM_ALPHA,
  SHADE_MID_ALPHA,
  SHADE_TOP_ALPHA,
  SHADE_Z_BACK,
  SHADE_Z_FRONT,
  SHADE_Z_THRESHOLD,
  SHARED_HERO_SCALE,
  SHARED_HERO_Y,
  SIGHTS_CONTROLS_END,
  SIGHTS_CONTROLS_START,
  SIGHTS_ENTER_END,
  SIGHTS_ENTER_POWER,
  SIGHTS_ENTER_START,
  SIGHTS_ENTER_X,
  SIGHTS_READY_AT,
  SIGHTS_TOP_MAX,
  SIGHTS_TOP_MIN,
  SIGHTS_TOP_NUDGE,
  SIGHTS_TOP_VH,
  SIGHTS_VISIBLE_AT,
  SPLIT_DRIFT_POWER,
  SPLIT_DRIFT_VW,
  SPLIT_DRIFT_Y,
  SPLIT_MOUSE_X,
  SPLIT_MOUSE_Y,
  SPLIT_SCALE_ENTER,
  TITLE_LIFT_PX,
  TITLE_SCALE_DROP,
} from '../constants';
import { clamp, segmentInOut, smoothstep } from './cinemaMath';

function resolvePointer(value, reduceMotion) {
  return reduceMotion ? 0 : value;
}

function sightsScreenTopFromHeight(innerHeight) {
  return Math.min(SIGHTS_TOP_MAX, Math.max(SIGHTS_TOP_MIN, innerHeight * SIGHTS_TOP_VH)) - SIGHTS_TOP_NUDGE;
}

function sightsParentTopFromScale(innerHeight, screenTop, backScale) {
  return innerHeight - (innerHeight - screenTop) / backScale;
}

export function buildCinemaVars({
  smoothScroll,
  mouseX,
  mouseY,
  innerHeight,
  reduceMotion,
}) {
  const frame2 = segmentInOut(smoothScroll, FRAME2_A, FRAME2_B, FRAME2_C, FRAME2_D);
  const frame3 = segmentInOut(smoothScroll, FRAME3_A, FRAME3_B, FRAME3_C, FRAME3_D);
  const progress = clamp(smoothScroll / PROGRESS_SPAN);
  const introExit = smoothstep(INTRO_EXIT_START, INTRO_EXIT_END, smoothScroll);
  const sightsEnterRaw = smoothstep(SIGHTS_ENTER_START, SIGHTS_ENTER_END, smoothScroll);
  const sightsEnter = sightsEnterRaw ** SIGHTS_ENTER_POWER;
  const sightsControlsEnter = smoothstep(SIGHTS_CONTROLS_START, SIGHTS_CONTROLS_END, smoothScroll);
  const blurActive = clamp(frame2.active + frame3.active);
  const frame2Opacity = frame2.active * (1 - frame3.enter);
  const splitDrift = frame2.enter ** SPLIT_DRIFT_POWER;
  const panel2Opacity = frame2.active * (1 - frame2.exit);
  const panel3Opacity = frame3.active * (1 - frame3.exit);
  const backScale =
    BACK_SCALE_BASE +
    progress * BACK_SCALE_PROGRESS +
    frame2.enter * BACK_SCALE_FRAME2 +
    frame3.enter * BACK_SCALE_FRAME3;
  const sharedHeroY = progress * SHARED_HERO_Y;
  const sharedHeroScale = progress * SHARED_HERO_SCALE;
  const sightsScreenTop = sightsScreenTopFromHeight(innerHeight);
  const sightsParentTop = sightsParentTopFromScale(innerHeight, sightsScreenTop, backScale);
  const mx = resolvePointer(mouseX, reduceMotion);
  const my = resolvePointer(mouseY, reduceMotion);

  return {
    '--mx': mx.toFixed(MX_DECIMALS),
    '--my': my.toFixed(MX_DECIMALS),
    '--back-opacity': String(1 - frame2.active * BACK_OPACITY_FRAME2),
    '--back-x': `${mx * BACK_PARALLAX_X}px`,
    '--back-y': `${my * BACK_PARALLAX_Y}px`,
    '--back-scale': String(backScale),
    '--four-y': `${FOUR_Y_BASE + progress * FOUR_Y_PROGRESS}vh`,
    '--four-scale': String(FOUR_SCALE_BASE + progress * FOUR_SCALE_PROGRESS),
    '--bazaar-y': `${BAZAAR_Y_BASE - progress * BAZAAR_Y_PROGRESS}vh`,
    '--blur-px': `${blurActive * BLUR_PX_MAX}px`,
    '--back-brightness': String(1 - blurActive * BRIGHTNESS_DROP),
    '--bazaar-blur-px': `${frame2.active * BLUR_PX_MAX}px`,
    '--bazaar-brightness': String(
      1 - frame2.active * BRIGHTNESS_DROP - frame3.active * BAZAAR_FRAME3_BRIGHTNESS,
    ),
    '--bazaar-saturation': String(1 + frame3.active * BAZAAR_SATURATION_GAIN),
    '--shade-opacity': '1',
    '--shade-z': frame2.active > SHADE_Z_THRESHOLD ? SHADE_Z_FRONT : SHADE_Z_BACK,
    '--shade-top-alpha': String(blurActive * SHADE_TOP_ALPHA),
    '--shade-mid-alpha': String(blurActive * SHADE_MID_ALPHA),
    '--shade-bottom-alpha': String(blurActive * SHADE_BOTTOM_ALPHA),
    '--title-y': `${introExit * TITLE_LIFT_PX}px`,
    '--title-scale': String(1 - introExit * TITLE_SCALE_DROP),
    '--title-opacity': String(1 - introExit),
    '--bridge-x': `calc(-50% + ${mx * BRIDGE_MOUSE_X}px)`,
    '--bridge-y': `${my * BRIDGE_MOUSE_Y + sharedHeroY - frame2.exit * BRIDGE_EXIT_Y}px`,
    '--bridge-bottom': `${BRIDGE_BOTTOM_BASE - frame2.enter * BRIDGE_BOTTOM_ENTER}vh`,
    '--bridge-width': `${BRIDGE_WIDTH_BASE + frame2.enter * BRIDGE_WIDTH_ENTER}vw`,
    '--bridge-scale': String(BRIDGE_SCALE_BASE + sharedHeroScale + frame2.exit * BRIDGE_SCALE_EXIT),
    '--split-left-x': `calc(-50% + ${-splitDrift * SPLIT_DRIFT_VW}vw + ${mx * SPLIT_MOUSE_X}px)`,
    '--split-left-y': `${my * SPLIT_MOUSE_Y + sharedHeroY - splitDrift * SPLIT_DRIFT_Y}px`,
    '--split-left-scale': String(1 + sharedHeroScale + frame2.enter * SPLIT_SCALE_ENTER),
    '--split-right-x': `calc(-50% + ${splitDrift * SPLIT_DRIFT_VW}vw + ${mx * SPLIT_MOUSE_X}px)`,
    '--split-right-y': `${my * SPLIT_MOUSE_Y + sharedHeroY - splitDrift * SPLIT_DRIFT_Y}px`,
    '--split-right-scale': String(1 + sharedHeroScale + frame2.enter * SPLIT_SCALE_ENTER),
    '--frame2-opacity': String(frame2Opacity),
    '--frame2-x': `calc(-50% + ${mx * FRAME2_MOUSE_X}px)`,
    '--frame2-y': `calc(-50% + ${my * FRAME2_MOUSE_Y - frame2.exit * FRAME2_EXIT_Y}px)`,
    '--frame2-scale': String(
      FRAME2_SCALE_BASE + frame2.enter * FRAME2_SCALE_STEP + frame2.exit * FRAME2_SCALE_STEP,
    ),
    '--intro-copy-y': `${introExit * INTRO_COPY_SINK}px`,
    '--intro-copy-opacity': String(1 - introExit),
    '--panel2-opacity': String(panel2Opacity),
    '--panel2-y': `calc(-50% + ${-frame2.exit * PANEL_EXIT_Y + (1 - frame2.enter) * PANEL_ENTER_Y}px)`,
    '--panel3-opacity': String(panel3Opacity),
    '--panel3-y': `calc(-50% + ${-frame3.exit * PANEL_EXIT_Y + (1 - frame3.enter) * PANEL_ENTER_Y}px)`,
    '--sights-opacity': String(sightsEnter),
    '--sights-controls-opacity': String(sightsControlsEnter),
    '--sights-visibility': sightsEnter > SIGHTS_VISIBLE_AT ? 'visible' : 'hidden',
    '--sights-y': '0px',
    '--sights-enter-x': `${(1 - sightsEnter) * SIGHTS_ENTER_X}vw`,
    '--sights-scale': String(1 / backScale),
    '--sights-top': `${sightsParentTop}px`,
    '--sights-screen-top': `${sightsScreenTop}px`,
    sightsReady: sightsControlsEnter > SIGHTS_READY_AT,
  };
}

export function applyCinemaVars(node, vars) {
  if (!node) return;
  Object.entries(vars).forEach(([key, value]) => {
    if (key.startsWith('--')) node.style.setProperty(key, value);
  });
}
