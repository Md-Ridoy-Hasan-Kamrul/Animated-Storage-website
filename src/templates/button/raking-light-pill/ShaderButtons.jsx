import { lazy, Suspense } from 'react';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DEFAULT_MODE,
  HUE_MAX,
  HUE_MIN,
  RAKING_DEFAULT_PROPS,
  SATURATION_MAX,
  SATURATION_MIN,
  VARIANT_ID,
} from './constants';

export const SHADER_BUTTONS_DEFAULTS = { ...RAKING_DEFAULT_PROPS };

const RAKING_VARIANT = 'raking-light-pill';

const RakingLightPillButton = lazy(() =>
  import('./RakingLightPillButton').then((module) => ({
    default: module.RakingLightPillButton,
  })),
);

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === RAKING_VARIANT ? RAKING_VARIANT : VARIANT_ID;
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

/**
 * ShaderButtons entry for the Raking Light Pill variant.
 * Lazy-loads the exact RakingLightPillButton WebGL renderer (ThreeUI family contract).
 */
export function ShaderButtons({
  variant = SHADER_BUTTONS_DEFAULTS.variant,
  mode = SHADER_BUTTONS_DEFAULTS.mode,
  hue = SHADER_BUTTONS_DEFAULTS.hue,
  saturation = SHADER_BUTTONS_DEFAULTS.saturation,
  brightness = SHADER_BUTTONS_DEFAULTS.brightness,
  className = '',
  style,
}) {
  const safeVariant = resolveVariant(variant);
  const safeMode = resolveMode(mode);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);

  if (safeVariant !== RAKING_VARIANT) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <RakingLightPillButton
        mode={safeMode}
        hue={safeHue}
        saturation={safeSaturation}
        brightness={safeBrightness}
        className={className}
        style={style}
      />
    </Suspense>
  );
}

export default ShaderButtons;
