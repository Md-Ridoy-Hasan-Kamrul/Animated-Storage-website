import React, { memo } from 'react';
import {
  BURGER_BARS,
  CLOSE_MENU_LABEL,
  OPEN_MENU_LABEL,
} from '../constants';

const BARS = Array.from({ length: BURGER_BARS }, (_, index) => index);

const Hamburger = memo(({ menuOpen, onToggle }) => (
  <button
    type="button"
    className="sp-burger"
    onClick={onToggle}
    aria-label={menuOpen ? CLOSE_MENU_LABEL : OPEN_MENU_LABEL}
    aria-expanded={menuOpen}
  >
    {BARS.map((index) => (
      <span key={index} className="sp-burger-bar" />
    ))}
  </button>
));

Hamburger.displayName = 'Hamburger';

export default Hamburger;
