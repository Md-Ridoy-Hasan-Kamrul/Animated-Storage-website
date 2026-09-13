import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  CONTENT_CLASS,
  FORM_GAP_CLASS,
  HEADLINE,
  HEADLINE_CLASS,
  SUBTITLE,
  SUBTITLE_CLASS,
  SUBTITLE_GAP_CLASS,
} from '../constants';
import { copyMotion } from '../utils/motionPresets';
import EmailForm from './EmailForm';
import FeaturePills from './FeaturePills';

const HeroCopy = memo(({ inputRef }) => (
  <motion.div className={CONTENT_CLASS} {...copyMotion}>
    <div>
      <h1 className={HEADLINE_CLASS}>{HEADLINE}</h1>
      <p className={`${SUBTITLE_CLASS} ${SUBTITLE_GAP_CLASS}`}>{SUBTITLE}</p>
      <div className={FORM_GAP_CLASS}>
        <EmailForm inputRef={inputRef} />
      </div>
      <FeaturePills variant="mobile" />
    </div>
    <FeaturePills variant="desktop" />
  </motion.div>
));

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
