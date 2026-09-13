import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  CHEVRON_SM,
  H2_DELAY,
  H2_LINE_ONE,
  H2_LINE_TWO,
  PRIMARY_CTA,
  S2_BADGE,
  S2_BADGE_DELAY,
  S2_BODY,
  S2_BODY_DELAY,
  S2_COPY_DELAY,
  S2_CTA_DELAY,
  S2_INTRO,
  SECONDARY_CTA,
} from '../constants';
import CapabilityPanel from './CapabilityPanel';
import Reveal from './Reveal';

const SectionTwo = () => (
  <section
    id="projects"
    className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
  >
    <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
      <Reveal delayMs={S2_BADGE_DELAY}>
        <p className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
          {S2_BADGE}
        </p>
      </Reveal>
      <Reveal delayMs={S2_COPY_DELAY} className="max-w-sm sm:text-right">
        <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">{S2_INTRO}</p>
      </Reveal>
    </div>

    <div className="flex flex-1 flex-col justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
      <div className="max-w-xl">
        <Reveal delayMs={H2_DELAY}>
          <h2 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            {H2_LINE_ONE}
            <br />
            {H2_LINE_TWO}
          </h2>
        </Reveal>
        <Reveal delayMs={S2_BODY_DELAY}>
          <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
            {S2_BODY}
          </p>
        </Reveal>
        <Reveal delayMs={S2_CTA_DELAY}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              {PRIMARY_CTA}
              <ChevronRight size={CHEVRON_SM} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              {SECONDARY_CTA}
            </a>
          </div>
        </Reveal>
      </div>
      <CapabilityPanel />
    </div>
  </section>
);

export default SectionTwo;
