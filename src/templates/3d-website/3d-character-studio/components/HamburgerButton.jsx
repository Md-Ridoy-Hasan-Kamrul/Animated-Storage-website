import React, { memo } from 'react';
import { hamburgerBarClass } from '../utils/hamburgerBars';

const HamburgerButton = memo(({ isOpen, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    className="flex flex-col gap-[5px] md:hidden"
  >
    <span className={hamburgerBarClass(isOpen, 'top')} />
    <span className={hamburgerBarClass(isOpen, 'mid')} />
    <span className={hamburgerBarClass(isOpen, 'bottom')} />
  </button>
));

HamburgerButton.displayName = 'HamburgerButton';

export default HamburgerButton;
