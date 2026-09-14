import React, { memo } from 'react';
import { NAV_LINKS } from '../constants';

const NavLinks = memo(({ className, onNavigate }) => (
  <div className={className}>
    {NAV_LINKS.map((item) => (
      <a key={item.label} className="sp-nav-link" href={item.href} onClick={onNavigate}>
        {item.label}
      </a>
    ))}
  </div>
));

NavLinks.displayName = 'NavLinks';

export default NavLinks;
