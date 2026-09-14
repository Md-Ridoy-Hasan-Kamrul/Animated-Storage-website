import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import {
  CLOSE_MENU_LABEL,
  MENU_ICON_SIZE,
  MENU_TOGGLE_CLASS,
  OPEN_MENU_LABEL,
} from '../constants';

const MenuToggle = memo(({ menuOpen, onToggle }) => (
  <button
    type="button"
    className={MENU_TOGGLE_CLASS}
    onClick={onToggle}
    aria-label={menuOpen ? CLOSE_MENU_LABEL : OPEN_MENU_LABEL}
    aria-expanded={menuOpen}
  >
    {menuOpen ? <X size={MENU_ICON_SIZE} /> : <Menu size={MENU_ICON_SIZE} />}
  </button>
));

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
