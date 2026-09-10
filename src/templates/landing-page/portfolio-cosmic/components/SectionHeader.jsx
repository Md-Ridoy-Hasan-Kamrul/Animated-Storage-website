import React from 'react';
import { motion } from 'framer-motion';
import AccentButton from './AccentButton';
import { SECTION_MOTION } from '../constants';

const VIEWPORT = { once: true, margin: SECTION_MOTION.viewportMargin };

/**
 * Shared section intro: eyebrow + italic heading word + subtext + optional CTA.
 */
const SectionHeader = ({
  eyebrow,
  titleBefore,
  titleItalic,
  titleAfter = '',
  subtext,
  ctaLabel,
  ctaHref = '#',
  className = '',
}) => (
  <motion.div
    className={`mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: SECTION_MOTION.duration, ease: SECTION_MOTION.ease }}
    viewport={VIEWPORT}
  >
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="pc-stroke h-px w-8" aria-hidden />
        <span className="pc-muted text-xs uppercase tracking-[0.3em]">{eyebrow}</span>
      </div>
      <h2 className="pc-text text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
        {titleBefore}{' '}
        <span className="pc-font-display italic">{titleItalic}</span>
        {titleAfter}
      </h2>
      {subtext ? (
        <p className="pc-muted mt-3 max-w-md text-sm md:text-base">{subtext}</p>
      ) : null}
    </div>
    {ctaLabel ? (
      <AccentButton
        href={ctaHref}
        variant="outline"
        className="hidden shrink-0 md:inline-flex"
      >
        {ctaLabel} <span aria-hidden>→</span>
      </AccentButton>
    ) : null}
  </motion.div>
);

export default SectionHeader;
