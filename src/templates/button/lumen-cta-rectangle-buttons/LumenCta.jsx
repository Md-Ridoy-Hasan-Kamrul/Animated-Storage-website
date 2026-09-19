import React from 'react';
import './lumen-cta.css';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  BUTTON_LABEL,
  DEFAULT_MODE,
  HUE_MAX,
  HUE_MIN,
  LUMEN_PRIMARY_VARIANT,
  SATURATION_MAX,
  SATURATION_MIN,
} from './constants';

export const LUMEN_CTA_DEFAULTS = {
  variant: LUMEN_PRIMARY_VARIANT,
  mode: DEFAULT_MODE,
  label: BUTTON_LABEL,
  ring: true,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

/**
 * Exact LumenCta renderer (from verified LumenCta.tsx).
 * Six-stop violet gradient pill with trailing open ring.
 */
export function LumenCta({
  variant = LUMEN_CTA_DEFAULTS.variant,
  mode = LUMEN_CTA_DEFAULTS.mode,
  label = LUMEN_CTA_DEFAULTS.label,
  ring = LUMEN_CTA_DEFAULTS.ring,
  hue = LUMEN_CTA_DEFAULTS.hue,
  saturation = LUMEN_CTA_DEFAULTS.saturation,
  brightness = LUMEN_CTA_DEFAULTS.brightness,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  style,
}) {
  const safeVariant = variant === 'ghost' ? 'ghost' : LUMEN_PRIMARY_VARIANT;
  const safeMode = mode === 'light' ? 'light' : DEFAULT_MODE;

  return (
    <div
      className={`lumen-cta lumen-cta--${safeMode}${className ? ` ${className}` : ''}`}
      data-variant={safeVariant}
      style={{
        '--lumen-cta-hue': `${clamp(hue, HUE_MIN, HUE_MAX)}deg`,
        '--lumen-cta-saturation': clamp(saturation, SATURATION_MIN, SATURATION_MAX),
        '--lumen-cta-brightness': clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX),
        ...style,
      }}
    >
      <button
        className={`lumen-cta__button${safeVariant === 'ghost' ? ' lumen-cta__button--ghost' : ''}`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
        {ring ? <i className="lumen-cta__ring" aria-hidden="true" /> : null}
      </button>
    </div>
  );
}

export default LumenCta;
