import React from 'react';
import {
  DEFAULT_MODE,
  TROCHIL_SIGNAL_DEFAULT_PROPS,
  VARIANT_ID,
} from './constants';
import { SelectedPageButton } from './SelectedPageButton';

export const RECTANGLE_BUTTONS_DEFAULTS = { ...TROCHIL_SIGNAL_DEFAULT_PROPS };

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

/**
 * RectangleButtons host for the Trochil Signal selected-page variant.
 * Mirrors ThreeUI: trochil-signal → SelectedPageButton.
 * Hue/saturation/brightness are accepted at the collection boundary for API parity;
 * SelectedPageButton does not apply palette filters in the authored source.
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
  void hue;
  void saturation;
  void brightness;
  void variant;

  const safeMode = resolveMode(mode);

  return (
    <div
      className={
        className
          ? `threeui-background rectangle-buttons-collection ${className}`
          : 'threeui-background rectangle-buttons-collection'
      }
      data-variant={VARIANT_ID}
      data-mode={safeMode}
      style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0, ...style }}
    >
      <SelectedPageButton variant={VARIANT_ID} mode={safeMode} />
    </div>
  );
}

export default RectangleButtons;
