import React from 'react';
import { motion } from 'framer-motion';
import {
  CTA_FEATURES,
  CTA_HOW,
  ENTRANCE_VISIBLE,
  FOOTER_TAGS,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_TWO,
  SUBTITLE,
} from '../constants';
import {
  buttonsVariants,
  entranceProps,
  footerVariants,
  headingVariants,
  subtitleVariants,
} from '../utils/motionPresets';

const HeroFooter = ({ entrance = ENTRANCE_VISIBLE }) => (
  <motion.footer className="tf-footer" {...entranceProps(footerVariants)} animate={entrance}>
    <div className="tf-footer-left">
      <motion.p className="tf-subtitle" {...entranceProps(subtitleVariants)} animate={entrance}>
        <span className="tf-dot" aria-hidden="true" />
        {SUBTITLE}
      </motion.p>
      <motion.h1 className="tf-heading" {...entranceProps(headingVariants)} animate={entrance}>
        <span>{HEADLINE_LINE_ONE}</span>
        <span>{HEADLINE_LINE_TWO}</span>
      </motion.h1>
      <motion.div className="tf-actions" {...entranceProps(buttonsVariants)} animate={entrance}>
        <button type="button" className="tf-btn tf-btn-solid">
          {CTA_FEATURES}
        </button>
        <button type="button" className="tf-btn tf-btn-ghost">
          {CTA_HOW}
        </button>
      </motion.div>
    </div>
    <div className="tf-footer-right">
      {FOOTER_TAGS.map((tag) => (
        <span key={tag} className="tf-chip">
          {tag}
        </span>
      ))}
    </div>
  </motion.footer>
);

export default HeroFooter;
