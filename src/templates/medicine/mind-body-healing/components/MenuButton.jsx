import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import {
  CLOSE_MENU_LABEL,
  ICON_SWAP_BASE,
  ICON_SWAP_OFF,
  ICON_SWAP_ON,
  MENU_BUTTON_CLASS,
  MENU_ICON_SIZE,
  OPEN_MENU_LABEL,
} from '../constants';
import { iconSwapClass } from '../utils/statIcons';

const MenuButton = memo(({ menuOpen, onToggle }) => (
  <button
    type="button"
    className={MENU_BUTTON_CLASS}
    onClick={onToggle}
    aria-expanded={menuOpen}
    aria-label={menuOpen ? CLOSE_MENU_LABEL : OPEN_MENU_LABEL}
  >
    <Menu
      size={MENU_ICON_SIZE}
      className={`${ICON_SWAP_BASE} ${iconSwapClass(!menuOpen, ICON_SWAP_ON, ICON_SWAP_OFF)}`}
    />
    <X
      size={MENU_ICON_SIZE}
      className={`${ICON_SWAP_BASE} ${iconSwapClass(menuOpen, ICON_SWAP_ON, ICON_SWAP_OFF)}`}
    />
  </button>
));

MenuButton.displayName = 'MenuButton';

export default MenuButton;
