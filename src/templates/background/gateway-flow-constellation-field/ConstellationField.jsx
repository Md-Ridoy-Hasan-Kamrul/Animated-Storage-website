import { useEffect, useRef } from 'react';

export const GATEWAY_FLOW_DEFAULTS = {
  variant: 'gateway-flow',
  mode: 'dark',
  speed: 1,
  size: 1,
  length: 1,
  density: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const SPEED_MIN = 0;
const SPEED_MAX = 3;
const SIZE_MIN = 0.05;
const SIZE_MAX = 200;
const LENGTH_MIN = 0.35;
const LENGTH_MAX = 2.5;
const DENSITY_MIN = 0.25;
const DENSITY_MAX = 2.5;
const OPACITY_MIN = 0.05;
const OPACITY_MAX = 1;
const HUE_MIN = -180;
const HUE_MAX = 180;
const SATURATION_MIN = 0;
const SATURATION_MAX = 2;
const BRIGHTNESS_MIN = 0.35;
const BRIGHTNESS_MAX = 1.65;
const DEFAULT_SOURCE_URL = '/effects/gateway-flow.html';
const HOST_BACKGROUND = '#000000';
const CONTROLS_TYPE = 'threeui-controls';
const VARIANT_ID = 'gateway-flow';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : 'dark';
}

function buildControlsPayload({ mode, speed, size, length, density, opacity }) {
  return {
    type: CONTROLS_TYPE,
    controls: { mode, speed, size, length, density, opacity },
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
 * CSP-safe host for the prebuilt Gateway Flow document.
 * Focused HTML lives at `/effects/gateway-flow.html` (srcDoc scripts blocked).
 */
export function ConstellationField({
  variant = GATEWAY_FLOW_DEFAULTS.variant,
  mode = GATEWAY_FLOW_DEFAULTS.mode,
  speed = GATEWAY_FLOW_DEFAULTS.speed,
  size = GATEWAY_FLOW_DEFAULTS.size,
  length = GATEWAY_FLOW_DEFAULTS.length,
  density = GATEWAY_FLOW_DEFAULTS.density,
  opacity = GATEWAY_FLOW_DEFAULTS.opacity,
  hue = GATEWAY_FLOW_DEFAULTS.hue,
  saturation = GATEWAY_FLOW_DEFAULTS.saturation,
  brightness = GATEWAY_FLOW_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = DEFAULT_SOURCE_URL,
}) {
  const iframeRef = useRef(null);
  const resolvedMode = resolveMode(mode);
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
        mode: resolvedMode,
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
    resolvedMode,
    safeDensity,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
  ]);

  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);
  const hostClassName = className
    ? `threeui-background constellation-field ${className}`
    : 'threeui-background constellation-field';

  return (
    <div
      className={hostClassName}
      data-variant={variant || VARIANT_ID}
      data-mode={resolvedMode}
      style={{ background: HOST_BACKGROUND, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title="Gateway Flow"
        src={sourceUrl}
        sandbox="allow-scripts"
        loading="eager"
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
          background: HOST_BACKGROUND,
          filter,
        }}
      />
    </div>
  );
}
