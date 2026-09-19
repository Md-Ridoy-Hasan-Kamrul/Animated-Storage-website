import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DEFAULT_MODE,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HUE_MAX,
  HUE_MIN,
  LAUNCH_BUTTON_DEFAULT_PROPS,
  PAGE_BG,
  SATURATION_MAX,
  SATURATION_MIN,
  SOURCE_URL,
  VARIANT_ID,
} from './constants';

export const RECTANGLE_BUTTONS_DEFAULTS = { ...LAUNCH_BUTTON_DEFAULT_PROPS };

const LAUNCH_BUTTON_VARIANT = 'launch-button';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === LAUNCH_BUTTON_VARIANT ? LAUNCH_BUTTON_VARIANT : VARIANT_ID;
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

function buildPaletteFilter(hue, saturation, brightness) {
  if (hue === 0 && saturation === 1 && brightness === 1) return undefined;
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

/**
 * CSP-safe RectangleButtons host for the Launch Button variant.
 * Mounts the focused Neuform document at `/effects/launch-button.html`.
 */
export function RectangleButtons({
  variant = RECTANGLE_BUTTONS_DEFAULTS.variant,
  mode = RECTANGLE_BUTTONS_DEFAULTS.mode,
  hue = RECTANGLE_BUTTONS_DEFAULTS.hue,
  saturation = RECTANGLE_BUTTONS_DEFAULTS.saturation,
  brightness = RECTANGLE_BUTTONS_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = SOURCE_URL,
}) {
  const safeVariant = resolveVariant(variant);
  const safeMode = resolveMode(mode);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);
  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);
  const hostClassName = className
    ? `threeui-background rectangle-buttons-collection ${className}`
    : 'threeui-background rectangle-buttons-collection';

  return (
    <div
      className={hostClassName}
      data-variant={safeVariant}
      data-mode={safeMode}
      style={{ background: PAGE_BG, pointerEvents: 'auto', ...style }}
    >
      <iframe
        title={FRAME_TITLE}
        src={sourceUrl}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        data-mode={safeMode}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
          background: PAGE_BG,
          filter,
        }}
      />
    </div>
  );
}

export default RectangleButtons;
