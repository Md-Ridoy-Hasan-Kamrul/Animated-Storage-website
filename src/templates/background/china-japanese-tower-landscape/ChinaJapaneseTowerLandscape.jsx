import React from 'react';
import { CHINESE_TOWER_DEFAULT_PROPS } from './constants';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';

/** Gallery card host — Chinese Tower Landscape (China). */
export function ChinaJapaneseTowerLandscape(props) {
  return <JapaneseTowerLandscape {...CHINESE_TOWER_DEFAULT_PROPS} {...props} />;
}

export default ChinaJapaneseTowerLandscape;
