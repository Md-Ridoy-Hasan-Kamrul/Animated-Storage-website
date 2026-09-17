import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DEFAULT_BRIGHTNESS,
  DEFAULT_HUE,
  DEFAULT_SATURATION,
  HUE_MAX,
  HUE_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
} from '../constants';

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

/** Outer-iframe grade only. Omitted at source-exact defaults (0 / 1 / 1). */
export function resolvePaletteFilter(
  hue = DEFAULT_HUE,
  saturation = DEFAULT_SATURATION,
  brightness = DEFAULT_BRIGHTNESS,
) {
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);

  if (
    safeHue === DEFAULT_HUE &&
    safeSaturation === DEFAULT_SATURATION &&
    safeBrightness === DEFAULT_BRIGHTNESS
  ) {
    return undefined;
  }

  return `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;
}
