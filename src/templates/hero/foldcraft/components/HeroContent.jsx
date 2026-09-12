import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ARROW_ICON_SIZE,
  BADGE_LABEL,
  EXPLORE_LABEL,
  HEADLINE_LINES,
  SUBTEXT,
} from '../constants';

const HeroContent = memo(({ onExplore }) => (
  <section
    id="home"
    className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-4 pb-8 pt-10 min-[375px]:px-6 min-[375px]:pb-10 min-[375px]:pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16"
  >
    <div className="max-w-3xl">
      <p className="animate-fade-slide-up-badge mb-4 text-xs text-white/90 sm:mb-6 sm:text-sm">
        {BADGE_LABEL}
      </p>
      <h1 className="animate-fade-slide-up-heading text-3xl font-medium leading-[1.1] tracking-tight text-white min-[425px]:text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl">
        {HEADLINE_LINES.map((line, index) => (
          <React.Fragment key={line}>
            {line}
            {index < HEADLINE_LINES.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </h1>
    </div>

    <div>
      <p className="animate-fade-slide-up-copy mb-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
        {SUBTEXT}
      </p>
      <button
        type="button"
        onClick={onExplore}
        className="animate-fade-slide-up-cta inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3"
      >
        {EXPLORE_LABEL}
        <ArrowRight size={ARROW_ICON_SIZE} strokeWidth={1.75} />
      </button>
    </div>
  </section>
));

HeroContent.displayName = 'HeroContent';

export default HeroContent;
