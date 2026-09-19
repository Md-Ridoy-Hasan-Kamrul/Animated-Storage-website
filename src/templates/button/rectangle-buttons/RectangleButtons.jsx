import { DarkGlassButton } from './DarkGlassButton';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  HUE_MAX,
  HUE_MIN,
  RECTANGLE_BUTTONS_DEFAULT_PROPS,
  SATURATION_MAX,
  SATURATION_MIN,
  VARIANT_ID,
} from './constants';

export const RECTANGLE_BUTTONS_DEFAULTS = { ...RECTANGLE_BUTTONS_DEFAULT_PROPS };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === VARIANT_ID ? VARIANT_ID : VARIANT_ID;
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : 'dark';
}

function buildPaletteFilter(hue, saturation, brightness) {
  if (hue === 0 && saturation === 1 && brightness === 1) return undefined;
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

/**
 * RectangleButtons host for Dark Glass (dark-pill).
 * Mirrors registered RectangleButtons.tsx dark-pill branch.
 */
export function RectangleButtons({
  variant = RECTANGLE_BUTTONS_DEFAULTS.variant,
  mode = RECTANGLE_BUTTONS_DEFAULTS.mode,
  hue = RECTANGLE_BUTTONS_DEFAULTS.hue,
  saturation = RECTANGLE_BUTTONS_DEFAULTS.saturation,
  brightness = RECTANGLE_BUTTONS_DEFAULTS.brightness,
  className = '',
  style,
}) {
  const safeVariant = resolveVariant(variant);
  const safeMode = resolveMode(mode);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);
  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);

  return (
    <div data-variant={safeVariant} style={{ width: '100%', height: '100%' }}>
      <DarkGlassButton
        mode={safeMode}
        className={className}
        style={{ filter, ...style }}
      />
    </div>
  );
}

export default RectangleButtons;
