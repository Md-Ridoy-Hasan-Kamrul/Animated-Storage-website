import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import { MENU_ICON_SIZE } from '../constants';

const MenuToggle = memo(({ isOpen, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    className="relative z-50 flex h-10 w-10 items-center justify-center text-white transition-transform duration-300 active:scale-90 md:hidden"
  >
    <Menu
      size={MENU_ICON_SIZE}
      strokeWidth={1.75}
      className={`absolute transition duration-300 ${
        isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
      }`}
    />
    <X
      size={MENU_ICON_SIZE}
      strokeWidth={1.75}
      className={`absolute transition duration-300 ${
        isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
      }`}
    />
  </button>
));

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
