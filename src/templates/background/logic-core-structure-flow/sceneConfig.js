import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  FRAME_TITLE,
  HUE_MAX,
  HUE_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
  SOURCE_URL,
  STRUCTURE_FLOW_VARIANTS,
  VARIANT_BACKGROUND,
} from './constants';

export function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function resolveStructureFlowVariant(variant) {
  return STRUCTURE_FLOW_VARIANTS.includes(variant) ? variant : 'logic-core';
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

export function resolveSceneChrome(variant) {
  return {
    label: FRAME_TITLE,
    background: VARIANT_BACKGROUND,
    source: SOURCE_URL,
    variant: resolveStructureFlowVariant(variant),
  };
}
