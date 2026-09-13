import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import {
  CLOSE_MENU_LABEL,
  MENU_GUTTER_CLASS,
  MENU_ICON_SIZE,
  OPEN_MENU_LABEL,
} from '../constants';

const MenuButton = memo(({ isOpen, onToggle }) => (
  <button
    type="button"
    className={`${MENU_GUTTER_CLASS} text-white`}
    onClick={onToggle}
    aria-expanded={isOpen}
    aria-label={isOpen ? CLOSE_MENU_LABEL : OPEN_MENU_LABEL}
  >
    {isOpen ? <X size={MENU_ICON_SIZE} /> : <Menu size={MENU_ICON_SIZE} />}
  </button>
));

MenuButton.displayName = 'MenuButton';

export default MenuButton;
