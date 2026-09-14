import React, { memo } from 'react';
import { HEADLINE_LINES } from '../constants';
import { headlineClass } from '../utils/viewport';

const HeroHeadline = memo(() => (
  <h1 className="sp-headline">
    {HEADLINE_LINES.map((line) => (
      <span key={line.text} className={headlineClass(line)}>
        {line.text}
      </span>
    ))}
  </h1>
));

HeroHeadline.displayName = 'HeroHeadline';

export default HeroHeadline;
