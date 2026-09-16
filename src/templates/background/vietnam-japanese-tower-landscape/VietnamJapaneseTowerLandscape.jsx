import React from 'react';
import { VIETNAMESE_TOWER_DEFAULT_PROPS } from './constants';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';

/** Gallery card host — Vietnamese Tower Landscape (Vietnam). */
export function VietnamJapaneseTowerLandscape(props) {
  return <JapaneseTowerLandscape {...VIETNAMESE_TOWER_DEFAULT_PROPS} {...props} />;
}

export default VietnamJapaneseTowerLandscape;
