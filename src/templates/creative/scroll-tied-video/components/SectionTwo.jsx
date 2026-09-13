import React, { memo } from 'react';
import { ArrowDown, ChevronUp } from 'lucide-react';
import {
  CIRCLE_LG,
  CIRCLE_MD,
  DARK,
  DARK_30,
  DARK_40,
  DARK_50,
  DARK_80,
  DOT_ACTIVE,
  DOT_IDLE,
  ICON_ARROW_LG,
  ICON_CHEVRON,
  PARTNER_LEAD,
  PARTNER_MID,
  PARTNER_TAIL,
  SECTION_FADE,
  STAGGER_VISIBLE_AT,
} from '../constants';
import { isStaggerVisible } from '../utils/sectionOpacity';
import Stagger from './Stagger';

const SectionTwo = memo(({ opacity }) => {
  const show = isStaggerVisible(opacity, STAGGER_VISIBLE_AT);

  return (
    <section
      className="vectrus-section pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-8"
      style={{ opacity, transition: SECTION_FADE }}
    >
      <Stagger show={show} delayMs={0}>
        <h2
          className="vectrus-title-md max-w-[900px] text-center font-extralight uppercase leading-[1.3] tracking-wide"
          style={{ color: DARK }}
        >
          {PARTNER_LEAD}
          <span style={{ color: DARK_80 }}>{PARTNER_MID}</span>{' '}
          <span style={{ color: DARK_50 }}>{PARTNER_TAIL}</span>
        </h2>
      </Stagger>

      <div className="absolute bottom-16 right-6 flex flex-col items-center sm:right-8 md:right-12">
        <Stagger show={show} delayMs={200}>
          <span
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: CIRCLE_LG,
              height: CIRCLE_LG,
              border: `1px solid ${DARK_40}`,
              color: DARK,
            }}
          >
            <ArrowDown size={ICON_ARROW_LG} />
          </span>
        </Stagger>
        <Stagger show={show} delayMs={350}>
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="rounded-full" style={{ width: DOT_ACTIVE, height: DOT_ACTIVE, backgroundColor: DARK }} />
            <span className="rounded-full" style={{ width: DOT_IDLE, height: DOT_IDLE, backgroundColor: DARK_40 }} />
            <span className="rounded-full" style={{ width: DOT_IDLE, height: DOT_IDLE, backgroundColor: DARK_40 }} />
          </div>
        </Stagger>
        <Stagger show={show} delayMs={500}>
          <span
            className="mt-2 inline-flex items-center justify-center rounded-full"
            style={{
              width: CIRCLE_MD,
              height: CIRCLE_MD,
              border: `1px solid ${DARK_30}`,
              color: DARK_80,
            }}
          >
            <ChevronUp size={ICON_CHEVRON} />
          </span>
        </Stagger>
      </div>
    </section>
  );
});

SectionTwo.displayName = 'SectionTwo';

export default SectionTwo;
