import React from 'react';
import { Menu } from 'lucide-react';
import { MENU_ICON_SIZE } from '../constants';
import DesktopNav from './DesktopNav';
import GpLogo from './GpLogo';

const Navbar = ({ onOpenMenu }) => (
  <header className="flex items-center justify-between py-6">
    <GpLogo />
    <DesktopNav />
    <button
      type="button"
      className="p-2 transition-opacity hover:opacity-70 md:hidden"
      onClick={onOpenMenu}
      aria-label="Open menu"
    >
      <Menu size={MENU_ICON_SIZE} />
    </button>
  </header>
);

export default Navbar;
