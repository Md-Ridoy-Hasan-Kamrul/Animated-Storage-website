import React from 'react';
import {
  HEADING_LINE_ONE,
  HEADING_LINE_TWO,
  LINE_ONE_DELAY,
  LINE_ONE_TRACKING,
  LINE_TWO_DELAY,
  LINE_TWO_TRACKING,
} from '../constants';

const HeroHeading = () => (
  <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
    <h1 className="leading-[0.95] text-white">
      <span
        className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl"
        style={{ letterSpacing: LINE_ONE_TRACKING, animationDelay: LINE_ONE_DELAY }}
      >
        {HEADING_LINE_ONE}
      </span>
      <span
        className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
        style={{ letterSpacing: LINE_TWO_TRACKING, animationDelay: LINE_TWO_DELAY }}
      >
        {HEADING_LINE_TWO}
      </span>
    </h1>
  </div>
);

export default HeroHeading;
