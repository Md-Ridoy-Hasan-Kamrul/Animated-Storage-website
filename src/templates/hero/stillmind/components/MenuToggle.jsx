import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import { MENU_ICON_SIZE } from '../constants';

const MenuToggle = memo(({ isOpen, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    className="liquid-glass relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
  >
    <Menu
      size={MENU_ICON_SIZE}
      strokeWidth={1.75}
      className={`absolute transition duration-300 ease-in-out ${
        isOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
      }`}
    />
    <X
      size={MENU_ICON_SIZE}
      strokeWidth={1.75}
      className={`absolute transition duration-300 ease-in-out ${
        isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
      }`}
    />
  </button>
));

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
