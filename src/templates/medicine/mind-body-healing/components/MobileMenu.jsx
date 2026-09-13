import React, { memo } from 'react';
import {
  MOBILE_LINK_CLASS,
  OVERLAY_BASE_CLASS,
  OVERLAY_CLOSED_CLASS,
  OVERLAY_OPEN_CLASS,
  OVERLAY_PANEL_BASE,
  OVERLAY_PANEL_CLOSED,
  OVERLAY_PANEL_OPEN,
  OVERLAY_TRANSITION_CLASS,
} from '../constants';
import { overlayMotionClass } from '../utils/statIcons';
import AccountChip from './AccountChip';
import NavLinks from './NavLinks';

const MobileMenu = memo(({ menuOpen, onNavigate }) => (
  <div
    className={`${OVERLAY_BASE_CLASS} ${OVERLAY_TRANSITION_CLASS} ${overlayMotionClass(
      menuOpen,
      OVERLAY_OPEN_CLASS,
      OVERLAY_CLOSED_CLASS,
    )}`}
  >
    <div
      className={`${OVERLAY_PANEL_BASE} ${overlayMotionClass(
        menuOpen,
        OVERLAY_PANEL_OPEN,
        OVERLAY_PANEL_CLOSED,
      )}`}
    >
      <NavLinks linkClassName={MOBILE_LINK_CLASS} onNavigate={onNavigate} />
      <AccountChip variant="mobile" onClick={onNavigate} />
    </div>
  </div>
));

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
