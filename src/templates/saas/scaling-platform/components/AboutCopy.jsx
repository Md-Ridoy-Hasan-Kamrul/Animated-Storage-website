import React, { memo } from 'react';
import { ABOUT_ACCENT, ABOUT_BODY, ABOUT_TITLE, CONTACT_ID, LEARN_LABEL } from '../constants';
import ChamferButton from './ChamferButton';

const AboutCopy = memo(() => (
  <div className="sp-about-copy">
    <h2 className="sp-about-title">
      {ABOUT_TITLE}
      <span className="sp-about-accent">{ABOUT_ACCENT}</span>
    </h2>
    <p className="sp-about-body">{ABOUT_BODY}</p>
    <ChamferButton href={`#${CONTACT_ID}`} className="sp-about-cta">
      {LEARN_LABEL}
    </ChamferButton>
  </div>
));

AboutCopy.displayName = 'AboutCopy';

export default AboutCopy;
