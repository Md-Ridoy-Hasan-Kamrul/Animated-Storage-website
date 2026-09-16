import React from 'react';
import { JAPANESE_TOWER_DEFAULT_PROPS } from './constants';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';

/** Gallery card host — Japanese Tower Landscape (Japan). */
export function JapanJapaneseTowerLandscape(props) {
  return <JapaneseTowerLandscape {...JAPANESE_TOWER_DEFAULT_PROPS} {...props} />;
}

export default JapanJapaneseTowerLandscape;
