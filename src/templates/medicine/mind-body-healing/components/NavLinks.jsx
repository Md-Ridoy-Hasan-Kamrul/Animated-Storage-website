import React, { memo } from 'react';
import { NAV_LINKS, NAV_LINK_TONE } from '../constants';

const NavLinks = memo(({ linkClassName, onNavigate }) => (
  <>
    {NAV_LINKS.map((link) => (
      <a
        key={link.id}
        href={link.href}
        className={linkClassName || NAV_LINK_TONE[link.tone]}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    ))}
  </>
));

NavLinks.displayName = 'NavLinks';

export default NavLinks;
