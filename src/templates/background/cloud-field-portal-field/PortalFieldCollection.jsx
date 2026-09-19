import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  CLOUD_FIELD_DEFAULT_PROPS,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HUE_MAX,
  HUE_MIN,
  PAGE_BG,
  SATURATION_MAX,
  SATURATION_MIN,
  SOURCE_URL,
  VARIANT_ID,
} from './constants';

export const PORTAL_FIELD_DEFAULTS = {
  variant: CLOUD_FIELD_DEFAULT_PROPS.variant,
  hue: CLOUD_FIELD_DEFAULT_PROPS.hue,
  saturation: CLOUD_FIELD_DEFAULT_PROPS.saturation,
  brightness: CLOUD_FIELD_DEFAULT_PROPS.brightness,
};

const CLOUD_FIELD_VARIANT = 'cloud-field';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === CLOUD_FIELD_VARIANT ? CLOUD_FIELD_VARIANT : VARIANT_ID;
}

function buildPaletteFilter(hue, saturation, brightness) {
  if (hue === 0 && saturation === 1 && brightness === 1) return undefined;
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

/**
 * CSP-safe Portal Field collection host.
 * Cloud Field mounts the focused strata-cloud document at `/effects/cloud-field.html`.
 */
export function PortalFieldCollection({
  variant = PORTAL_FIELD_DEFAULTS.variant,
  hue = PORTAL_FIELD_DEFAULTS.hue,
  saturation = PORTAL_FIELD_DEFAULTS.saturation,
  brightness = PORTAL_FIELD_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = SOURCE_URL,
}) {
  const safeVariant = resolveVariant(variant);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);
  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);
  const hostClassName = className
    ? `threeui-background portal-field-collection ${className}`
    : 'threeui-background portal-field-collection';

  return (
    <div
      className={hostClassName}
      data-variant={safeVariant}
      style={{ background: PAGE_BG, pointerEvents: 'auto', ...style }}
    >
      <iframe
        title={FRAME_TITLE}
        src={sourceUrl}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        data-mode="dark"
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

export default PortalFieldCollection;
