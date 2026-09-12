import React, { memo } from 'react';
import {
  HEADLINE_EMPHASIS,
  HEADLINE_JOIN,
  HEADLINE_PREFIX,
  SUBTEXT,
} from '../constants';
import LiquidGlassButton from './LiquidGlassButton';

const HeroCopy = memo(({ onBeginJourney }) => (
  <section
    id="home"
    className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center min-[375px]:px-6 min-[375px]:py-20 md:px-6 md:py-[90px] md:pt-32 md:pb-40"
  >
    <h1 className="velorah-display animate-fade-rise max-w-7xl text-[1.85rem] font-normal leading-[0.95] tracking-[-1.2px] min-[375px]:text-[2.35rem] min-[425px]:text-5xl min-[425px]:tracking-[-1.8px] sm:text-7xl sm:tracking-[-2.2px] md:text-8xl md:tracking-[-2.46px]">
      {HEADLINE_PREFIX}{' '}
      <em className="not-italic text-muted-foreground">{HEADLINE_EMPHASIS[0]}</em> {HEADLINE_JOIN}{' '}
      <em className="not-italic text-muted-foreground">{HEADLINE_EMPHASIS[1]}</em>
    </h1>

    <p className="animate-fade-rise-delay mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground min-[375px]:mt-6 min-[375px]:text-base sm:mt-8 sm:text-lg">
      {SUBTEXT}
    </p>

    <div className="animate-fade-rise-delay-2">
      <LiquidGlassButton variant="hero" onClick={onBeginJourney} />
    </div>
  </section>
));

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
