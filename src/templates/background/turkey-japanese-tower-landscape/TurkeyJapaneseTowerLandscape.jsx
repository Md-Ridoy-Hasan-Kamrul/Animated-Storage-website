import React from 'react';
import { TURKISH_TOWER_DEFAULT_PROPS } from './constants';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';

/** Gallery card host — Turkish Tower Landscape (Turkey). */
export function TurkeyJapaneseTowerLandscape(props) {
  return <JapaneseTowerLandscape {...TURKISH_TOWER_DEFAULT_PROPS} {...props} />;
}

export default TurkeyJapaneseTowerLandscape;
