import React from 'react';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DEFAULT_MODE,
  HUE_MAX,
  HUE_MIN,
  LUMEN_CTA_DEFAULT_PROPS,
  LUMEN_PRIMARY_VARIANT,
  SATURATION_MAX,
  SATURATION_MIN,
  VARIANT_ID,
} from './constants';
import { LumenCta } from './LumenCta';

export const RECTANGLE_BUTTONS_DEFAULTS = { ...LUMEN_CTA_DEFAULT_PROPS };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveLumenTreatment(variant) {
  if (variant === 'lumen-cta-ghost') return 'ghost';
  return LUMEN_PRIMARY_VARIANT;
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

/**
 * RectangleButtons host for the Lumen CTA variant.
 * Mirrors ThreeUI: lumen-cta / lumen-cta-ghost → LumenCta primary / ghost.
 */
export function RectangleButtons({
  variant = RECTANGLE_BUTTONS_DEFAULTS.variant,
  mode = RECTANGLE_BUTTONS_DEFAULTS.mode,
  hue = RECTANGLE_BUTTONS_DEFAULTS.hue,
  saturation = RECTANGLE_BUTTONS_DEFAULTS.saturation,
  brightness = RECTANGLE_BUTTONS_DEFAULTS.brightness,
  className = '',
  style,
  label,
  ring,
  disabled,
  type,
  onClick,
}) {
  const safeVariant = variant === VARIANT_ID || variant === 'lumen-cta-ghost' ? variant : VARIANT_ID;
  const lumenTreatment = resolveLumenTreatment(safeVariant);
  const safeMode = resolveMode(mode);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);

  return (
    <div
      className={
        className
          ? `threeui-background rectangle-buttons-collection ${className}`
          : 'threeui-background rectangle-buttons-collection'
      }
      data-variant={safeVariant}
      data-mode={safeMode}
      style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0, ...style }}
    >
      <LumenCta
        variant={lumenTreatment}
        mode={safeMode}
        hue={safeHue}
        saturation={safeSaturation}
        brightness={safeBrightness}
        label={label}
        ring={ring}
        disabled={disabled}
        type={type}
        onClick={onClick}
      />
    </div>
  );
}

export default RectangleButtons;
