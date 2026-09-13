import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { NAV_CLASS, NAV_PILL_CLASS, NAV_RIGHT_CLASS } from '../constants';
import { navMotion } from '../utils/motionPresets';
import AccountChip from './AccountChip';
import BrandMark from './BrandMark';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';

const Navbar = memo(({ menuOpen, onToggle }) => (
  <motion.nav className={NAV_CLASS} {...navMotion}>
    <a href="#home" aria-label="Vibrant Wellness home">
      <BrandMark />
    </a>
    <div className={NAV_PILL_CLASS}>
      <NavLinks />
    </div>
    <div className={NAV_RIGHT_CLASS}>
      <AccountChip variant="desktop" />
      <MenuButton menuOpen={menuOpen} onToggle={onToggle} />
    </div>
  </motion.nav>
));

Navbar.displayName = 'Navbar';

export default Navbar;
