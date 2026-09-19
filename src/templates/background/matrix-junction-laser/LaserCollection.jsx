import { useEffect, useRef } from 'react';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DENSITY_MAX,
  DENSITY_MIN,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HUE_MAX,
  HUE_MIN,
  LENGTH_MAX,
  LENGTH_MIN,
  MATRIX_FIELD_DEFAULT_PROPS,
  OPACITY_MAX,
  OPACITY_MIN,
  PAGE_BG,
  SATURATION_MAX,
  SATURATION_MIN,
  SIZE_MAX,
  SIZE_MIN,
  SOURCE_URL,
  SPEED_MAX,
  SPEED_MIN,
  VARIANT_ID,
} from './constants';

export const LASER_COLLECTION_DEFAULTS = { ...MATRIX_FIELD_DEFAULT_PROPS };

const CONTROLS_TYPE = 'threeui-controls';
const MATRIX_FIELD_VARIANT = 'matrix-field';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === MATRIX_FIELD_VARIANT ? MATRIX_FIELD_VARIANT : VARIANT_ID;
}

function buildControlsPayload({ speed, size, length, density, opacity }) {
  return {
    type: CONTROLS_TYPE,
    controls: { mode: 'dark', speed, size, length, density, opacity },
  };
}

function buildPaletteFilter(hue, saturation, brightness) {
  if (hue === 0 && saturation === 1 && brightness === 1) return undefined;
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

function postControls(frame, payload) {
  frame?.postMessage(payload, '*');
}

/**
 * CSP-safe Laser collection host for Matrix Junction (matrix-field).
 * Focused HTML lives at `/effects/matrix-field.html` (srcDoc scripts blocked).
 */
export function LaserCollection({
  variant = LASER_COLLECTION_DEFAULTS.variant,
  speed = LASER_COLLECTION_DEFAULTS.speed,
  size = LASER_COLLECTION_DEFAULTS.size,
  length = LASER_COLLECTION_DEFAULTS.length,
  density = LASER_COLLECTION_DEFAULTS.density,
  opacity = LASER_COLLECTION_DEFAULTS.opacity,
  hue = LASER_COLLECTION_DEFAULTS.hue,
  saturation = LASER_COLLECTION_DEFAULTS.saturation,
  brightness = LASER_COLLECTION_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = SOURCE_URL,
}) {
  const iframeRef = useRef(null);
  const safeVariant = resolveVariant(variant);
  const safeSpeed = clamp(speed, SPEED_MIN, SPEED_MAX);
  const safeSize = clamp(size, SIZE_MIN, SIZE_MAX);
  const safeLength = clamp(length, LENGTH_MIN, LENGTH_MAX);
  const safeDensity = clamp(density, DENSITY_MIN, DENSITY_MAX);
  const safeOpacity = clamp(opacity, OPACITY_MIN, OPACITY_MAX);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);

  const postCurrentControls = () => {
    postControls(
      iframeRef.current?.contentWindow,
      buildControlsPayload({
        speed: safeSpeed,
        size: safeSize,
        length: safeLength,
        density: safeDensity,
        opacity: safeOpacity,
      }),
    );
  };

  useEffect(() => {
    postCurrentControls();
  }, [
    safeDensity,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
  ]);

  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);
  const hostClassName = className
    ? `threeui-background laser-collection ${className}`
    : 'threeui-background laser-collection';

  return (
    <div
      className={hostClassName}
      data-variant={safeVariant}
      style={{ background: PAGE_BG, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title={FRAME_TITLE}
        src={sourceUrl}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        data-mode="dark"
        onLoad={postCurrentControls}
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

export default LaserCollection;
