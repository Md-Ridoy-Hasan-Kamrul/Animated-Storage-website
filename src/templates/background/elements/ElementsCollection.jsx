import React from 'react';
import { ElementsBackground, ELEMENTS_DEFAULTS } from './ElementsBackground';

export { ELEMENTS_DEFAULTS };

/**
 * Public entry for the Elements family. This card mounts the Water variant.
 * Other family members (lightning / fire / condensation / generative-tree)
 * stay out of this gallery card per the configured usage.
 */
export function ElementsCollection({
  variant = ELEMENTS_DEFAULTS.variant,
  speed = ELEMENTS_DEFAULTS.speed,
  size = ELEMENTS_DEFAULTS.size,
  particleAmount = ELEMENTS_DEFAULTS.particleAmount,
  hue = ELEMENTS_DEFAULTS.hue,
  saturation = ELEMENTS_DEFAULTS.saturation,
  brightness = ELEMENTS_DEFAULTS.brightness,
  opacity = ELEMENTS_DEFAULTS.opacity,
  className = '',
  style,
  sourceUrl,
}) {
  return (
    <ElementsBackground
      variant={variant}
      speed={speed}
      size={size}
      particleAmount={particleAmount}
      hue={hue}
      saturation={saturation}
      brightness={brightness}
      opacity={opacity}
      className={className}
      style={style}
      sourceUrl={sourceUrl}
    />
  );
}
