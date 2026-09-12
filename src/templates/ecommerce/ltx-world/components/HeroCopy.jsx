import React, { memo } from 'react';
import { HERO_SUBTEXT, HERO_TITLE_WORDS } from '../constants';

const HeroCopy = memo(() => (
  <div className="hero">
    <h1>
      {HERO_TITLE_WORDS.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </h1>
    <p>{HERO_SUBTEXT}</p>
  </div>
));

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
