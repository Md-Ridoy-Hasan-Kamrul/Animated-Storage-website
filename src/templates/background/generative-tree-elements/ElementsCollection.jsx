import React from 'react';
import { GenerativeTree, GENERATIVE_TREE_DEFAULTS } from './GenerativeTree';

export { GENERATIVE_TREE_DEFAULTS };

/**
 * Public Elements family entry for this card — mounts Generative Tree.
 */
export function ElementsCollection({
  variant: _variant = 'generative-tree',
  speed = GENERATIVE_TREE_DEFAULTS.speed,
  size = GENERATIVE_TREE_DEFAULTS.size,
  particleAmount = GENERATIVE_TREE_DEFAULTS.particleAmount,
  hue = GENERATIVE_TREE_DEFAULTS.hue,
  saturation = GENERATIVE_TREE_DEFAULTS.saturation,
  brightness = GENERATIVE_TREE_DEFAULTS.brightness,
  opacity = GENERATIVE_TREE_DEFAULTS.opacity,
  className = '',
  style,
  sourceUrl,
}) {
  return (
    <GenerativeTree
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
