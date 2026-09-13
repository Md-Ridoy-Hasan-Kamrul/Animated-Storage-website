import React from 'react';
import {
  COPY_LEFT,
  COPY_LEFT_DELAY,
  COPY_RIGHT,
  COPY_RIGHT_DELAY,
  CTA_LABEL,
} from '../constants';

const HeroCopy = () => (
  <>
    <div
      className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block md:left-14"
      style={{ animationDelay: COPY_LEFT_DELAY }}
    >
      <p className="text-sm leading-relaxed text-white/80">{COPY_LEFT}</p>
    </div>

    <div
      className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
      style={{ animationDelay: COPY_RIGHT_DELAY }}
    >
      <p className="text-xs leading-relaxed text-white/80 sm:text-sm">{COPY_RIGHT}</p>
      <button
        type="button"
        className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
      >
        {CTA_LABEL}
      </button>
    </div>
  </>
);

export default HeroCopy;
