import React, { memo } from 'react';
import { ABOUT_ID, CONTACT_ID } from '../constants';
import AboutCopy from './AboutCopy';
import AboutMedia from './AboutMedia';

const AboutSection = memo(() => (
  <section className="sp-about" id={ABOUT_ID}>
    <AboutCopy />
    <AboutMedia />
    <span id={CONTACT_ID} className="sp-sr-only" />
  </section>
));

AboutSection.displayName = 'AboutSection';

export default AboutSection;
