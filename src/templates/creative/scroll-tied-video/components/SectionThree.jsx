import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CIRCLE_MD,
  ICON_ARROW_SM,
  S3_CTA,
  S3_EYEBROW,
  S3_LINE_ONE,
  S3_LINE_TWO,
  SECTION_FADE,
  STAGGER_VISIBLE_AT,
} from '../constants';
import { isStaggerVisible } from '../utils/sectionOpacity';
import Stagger from './Stagger';

const SectionThree = memo(({ opacity }) => {
  const show = isStaggerVisible(opacity, STAGGER_VISIBLE_AT);

  return (
    <section
      className="vectrus-section pointer-events-none absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
      style={{ opacity, transition: SECTION_FADE }}
    >
      <div className="max-w-2xl text-left">
        <Stagger show={show} delayMs={0}>
          <p className="mb-4 text-lg tracking-wide text-white/60">{S3_EYEBROW}</p>
        </Stagger>
        <Stagger show={show} delayMs={150}>
          <h2
            className="vectrus-title-sm mb-8 font-light uppercase leading-[1.2] tracking-wide text-white"
          >
            {S3_LINE_ONE}
            <br />
            {S3_LINE_TWO}
          </h2>
        </Stagger>
        <Stagger show={show} delayMs={300} className="pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">{S3_CTA}</span>
            <button
              type="button"
              aria-label={S3_CTA}
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-800 transition-transform duration-300 hover:scale-110"
              style={{ width: CIRCLE_MD, height: CIRCLE_MD }}
            >
              <ArrowRight size={ICON_ARROW_SM} />
            </button>
          </div>
        </Stagger>
      </div>
    </section>
  );
});

SectionThree.displayName = 'SectionThree';

export default SectionThree;
