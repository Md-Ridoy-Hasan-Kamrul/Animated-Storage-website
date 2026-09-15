import React from 'react';
import { FRAME_TITLE, SOURCE_URL } from './constants';
import { LandingPageFrame } from './LandingPageFrame';

/** Authored ThreeUI entry — byte-exact document, no typography controls. */
export function SublevelStudioLandingPage(props) {
  return (
    <LandingPageFrame
      {...props}
      title={FRAME_TITLE}
      sourceUrl={SOURCE_URL}
    />
  );
}

export default SublevelStudioLandingPage;
