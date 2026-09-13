import React from 'react';
import { motion } from 'framer-motion';
import { ENTRANCE_VISIBLE } from '../constants';
import { entranceProps, navVariants } from '../utils/motionPresets';
import AdaptivePill from './AdaptivePill';
import BrandMark from './BrandMark';
import MenuButton from './MenuButton';
import TagsPill from './TagsPill';

const Navbar = ({ entrance = ENTRANCE_VISIBLE }) => (
  <motion.nav className="tf-nav" {...entranceProps(navVariants)} animate={entrance}>
    <div className="tf-nav-left">
      <BrandMark />
      <MenuButton />
      <TagsPill />
    </div>
    <div className="tf-nav-right">
      <AdaptivePill />
    </div>
  </motion.nav>
);

export default Navbar;
