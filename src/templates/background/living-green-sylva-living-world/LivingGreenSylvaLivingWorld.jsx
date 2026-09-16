import React from 'react';
import { SYLVA_LIVING_WORLD_DEFAULT_PROPS } from './constants';
import { SylvaLivingWorldScene } from './SylvaLivingWorldScene';

/**
 * Gallery card host — Living Green Sylva Living World (scene-only).
 */
export function LivingGreenSylvaLivingWorld(props) {
  return <SylvaLivingWorldScene {...SYLVA_LIVING_WORLD_DEFAULT_PROPS} {...props} />;
}

export default LivingGreenSylvaLivingWorld;
