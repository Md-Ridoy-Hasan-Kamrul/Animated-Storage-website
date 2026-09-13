import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  COPY_WRAP_CLASS,
  CTA_CLASS,
  CTA_LABEL,
  HEADLINE_CLASS,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_TWO,
  SUBTITLE,
  SUBTITLE_CLASS,
} from '../constants';
import { copyMotion } from '../utils/motionPresets';
import WellnessBadge from './WellnessBadge';

const HeroCopy = memo(() => (
  <motion.div className={COPY_WRAP_CLASS} {...copyMotion}>
    <WellnessBadge />
    <h1 className={HEADLINE_CLASS}>
      {HEADLINE_LINE_ONE}
      <br />
      {HEADLINE_LINE_TWO}
    </h1>
    <p className={SUBTITLE_CLASS}>{SUBTITLE}</p>
    <a href="#consultation" className={CTA_CLASS}>
      {CTA_LABEL}
    </a>
  </motion.div>
));

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
