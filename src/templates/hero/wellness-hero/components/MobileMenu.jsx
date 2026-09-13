import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  JOIN_LABEL,
  JOIN_MOBILE_CLASS,
  MOBILE_MENU_CLASS,
  NAV_LINK_CLASS,
  NAV_LINKS,
} from '../constants';
import { navMotion } from '../utils/motionPresets';

const MobileMenu = memo(({ isOpen, onNavigate, onJoin }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div className={MOBILE_MENU_CLASS} {...navMotion}>
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className={NAV_LINK_CLASS}
            onClick={onNavigate}
          >
            {label}
          </a>
        ))}
        <button type="button" className={JOIN_MOBILE_CLASS} onClick={onJoin}>
          {JOIN_LABEL}
        </button>
      </motion.div>
    ) : null}
  </AnimatePresence>
));

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
