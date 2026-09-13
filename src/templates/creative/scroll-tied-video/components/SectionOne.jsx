import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CIRCLE_LG,
  DARK,
  DARK_50,
  DARK_90,
  HERO_SUBTITLE,
  HERO_TITLE,
  ICON_ARROW_LG,
  SECTION_FADE,
  STAGGER_VISIBLE_AT,
} from '../constants';
import { isStaggerVisible } from '../utils/sectionOpacity';
import Stagger from './Stagger';

const SectionOne = memo(({ opacity }) => {
  const show = isStaggerVisible(opacity, STAGGER_VISIBLE_AT);

  return (
    <section
      className="vectrus-section pointer-events-none absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32"
      style={{ opacity, transition: SECTION_FADE }}
    >
      <div className="max-w-5xl">
        <Stagger show={show} delayMs={0}>
          <h1
            className="vectrus-title-lg font-light uppercase leading-[1.2]"
            style={{ color: DARK }}
          >
            {HERO_TITLE}
          </h1>
        </Stagger>
        <Stagger show={show} delayMs={150}>
          <p
            className="mt-6 text-sm uppercase tracking-[0.3em]"
            style={{ color: DARK_90 }}
          >
            {HERO_SUBTITLE}
          </p>
        </Stagger>
      </div>
      <button
        type="button"
        aria-label="Continue"
        className={`vectrus-stagger pointer-events-auto absolute bottom-12 right-6 inline-flex items-center justify-center rounded-full hover:opacity-70 sm:right-8 md:right-12 ${
          show ? 'is-in' : ''
        }`}
        style={{
          '--stagger-delay': '300ms',
          width: CIRCLE_LG,
          height: CIRCLE_LG,
          border: `1px solid ${DARK_50}`,
          color: DARK,
        }}
      >
        <ArrowRight size={ICON_ARROW_LG} />
      </button>
    </section>
  );
});

SectionOne.displayName = 'SectionOne';

export default SectionOne;
