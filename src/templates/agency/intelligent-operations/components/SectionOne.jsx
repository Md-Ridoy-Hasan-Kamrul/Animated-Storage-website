import React from 'react';
import {
  H1_DELAY,
  H1_LINE_ONE,
  H1_LINE_TWO,
  HERO_BADGE,
  HERO_BADGE_DELAY,
  HERO_INTRO,
  INTRO_DELAY,
  MITHA_DELAY,
  SERVICE_DELAY_START,
  SERVICE_DELAY_STEP,
  SERVICES,
} from '../constants';
import { staggerDelay } from '../utils/delays';
import MithaCard from './MithaCard';
import Reveal from './Reveal';

const SectionOne = () => (
  <section
    id="top"
    className="flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
  >
    <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
      <ul className="flex flex-col gap-2">
        {SERVICES.map((label, index) => (
          <li key={label}>
            <Reveal delayMs={staggerDelay(SERVICE_DELAY_START, SERVICE_DELAY_STEP, index)}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {label}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal delayMs={INTRO_DELAY} className="max-w-xs sm:text-right">
        <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">{HERO_INTRO}</p>
      </Reveal>
    </div>

    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <Reveal delayMs={HERO_BADGE_DELAY}>
          <p className="mb-5 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] backdrop-blur-md">
            {HERO_BADGE}
          </p>
        </Reveal>
        <Reveal delayMs={H1_DELAY}>
          <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            {H1_LINE_ONE}
            <br />
            {H1_LINE_TWO}
          </h1>
        </Reveal>
      </div>
      <Reveal delayMs={MITHA_DELAY}>
        <MithaCard />
      </Reveal>
    </div>
  </section>
);

export default SectionOne;
