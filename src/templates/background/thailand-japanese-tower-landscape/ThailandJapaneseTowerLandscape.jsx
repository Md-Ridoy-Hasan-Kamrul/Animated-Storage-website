import React from 'react';
import { THAI_TOWER_DEFAULT_PROPS } from './constants';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';

/** Gallery card host — Thai Tower Landscape (Thailand). */
export function ThailandJapaneseTowerLandscape(props) {
  return <JapaneseTowerLandscape {...THAI_TOWER_DEFAULT_PROPS} {...props} />;
}

export default ThailandJapaneseTowerLandscape;
