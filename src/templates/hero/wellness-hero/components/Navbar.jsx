import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  BRAND_GAP_CLASS,
  BRAND_NAME,
  BRAND_TEXT_CLASS,
  JOIN_DESKTOP_CLASS,
  JOIN_LABEL,
  NAV_CLASS,
  NAV_PILL_CLASS,
} from '../constants';
import { navMotion } from '../utils/motionPresets';
import BrandMark from './BrandMark';
import MenuButton from './MenuButton';

const Navbar = memo(({ isOpen, onToggle, onJoin }) => (
  <motion.nav className={NAV_CLASS} {...navMotion}>
    <div className={NAV_PILL_CLASS}>
      <BrandMark />
      <span className={`${BRAND_TEXT_CLASS} ${BRAND_GAP_CLASS}`}>{BRAND_NAME}</span>
      <MenuButton isOpen={isOpen} onToggle={onToggle} />
    </div>
    <button type="button" className={JOIN_DESKTOP_CLASS} onClick={onJoin}>
      {JOIN_LABEL}
    </button>
  </motion.nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;
