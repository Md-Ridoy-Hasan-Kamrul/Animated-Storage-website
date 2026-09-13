import React from 'react';
import { Plus } from 'lucide-react';
import { MENU_LABEL, PLUS_SIZE, PLUS_STROKE } from '../constants';

const MenuButton = () => (
  <button type="button" className="tf-menu">
    <span className="tf-circle tf-circle-light">
      <Plus size={PLUS_SIZE} strokeWidth={PLUS_STROKE} />
    </span>
    <span className="tf-menu-label">{MENU_LABEL}</span>
  </button>
);

export default MenuButton;
