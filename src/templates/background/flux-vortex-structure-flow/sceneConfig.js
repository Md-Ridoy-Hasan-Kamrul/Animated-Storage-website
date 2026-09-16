import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  CONTROLS_MESSAGE_TYPE,
  DENSITY_MAX,
  DENSITY_MIN,
  EFFECT_MODE,
  FRAME_TITLE,
  HUE_MAX,
  HUE_MIN,
  LENGTH_MAX,
  LENGTH_MIN,
  OPACITY_MAX,
  OPACITY_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
  SIZE_MAX,
  SIZE_MIN,
  SOURCE_URL,
  SPEED_MAX,
  SPEED_MIN,
  STRUCTURE_FLOW_VARIANTS,
  VARIANT_BACKGROUND,
} from './constants';

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function resolveStructureFlowVariant(variant) {
  return STRUCTURE_FLOW_VARIANTS.includes(variant) ? variant : 'flux-vortex';
}

export function resolveSceneFilter(hue, saturation, brightness) {
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);
  if (safeHue === 0 && safeSaturation === 1 && safeBrightness === 1) {
    return undefined;
  }
  return `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;
}

export function resolveLiveControls({ speed, size, length, density, opacity }) {
  return {
    mode: EFFECT_MODE,
    speed: clamp(speed, SPEED_MIN, SPEED_MAX),
    size: clamp(size, SIZE_MIN, SIZE_MAX),
    length: clamp(length, LENGTH_MIN, LENGTH_MAX),
    density: clamp(density, DENSITY_MIN, DENSITY_MAX),
    opacity: clamp(opacity, OPACITY_MIN, OPACITY_MAX),
  };
}

export function postLiveControls(frameWindow, controls) {
  if (!frameWindow) return;
  frameWindow.postMessage({ type: CONTROLS_MESSAGE_TYPE, controls }, '*');
}

export function resolveSceneChrome(variant) {
  return {
    label: FRAME_TITLE,
    background: VARIANT_BACKGROUND,
    source: SOURCE_URL,
    variant: resolveStructureFlowVariant(variant),
  };
}
