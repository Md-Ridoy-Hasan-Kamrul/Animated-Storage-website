import React, { memo } from 'react';
import { HERO_TAGS, INTRO_COPY } from '../constants';

const IntroCopy = memo(() => (
  <section className="intro-copy" aria-label="Mostar overview">
    <p>{INTRO_COPY}</p>
    <div className="hero-tags" aria-label="Mostar highlights">
      {HERO_TAGS.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </section>
));

IntroCopy.displayName = 'IntroCopy';

export default IntroCopy;
