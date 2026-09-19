import React from 'react';
import {
  DEFAULT_MODE,
  TIDEFORM_OUTLINE_DEFAULT_PROPS,
  VARIANT_ID,
} from './constants';
import { SelectedPageButton } from './SelectedPageButton';

export const RECTANGLE_BUTTONS_DEFAULTS = { ...TIDEFORM_OUTLINE_DEFAULT_PROPS };

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

/**
 * RectangleButtons host for the Tideform Outline selected-page variant.
 * Mirrors ThreeUI: tideform-outline → SelectedPageButton.
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
      <SelectedPageButton mode={safeMode} />
    </div>
  );
}

export default RectangleButtons;
