import React, { memo } from 'react';
import { NAV_LINKS } from '../constants';
import { withNavSeparators } from '../utils/navCopy';

const NavLinks = memo(({ onNavigate, className, itemClassName, showSeparators = false }) => (
  <>
    {withNavSeparators(NAV_LINKS).map((link) => (
      <span key={link.href} className={className}>
        {showSeparators ? link.prefix : null}
        <a href={link.href} onClick={onNavigate} className={itemClassName}>
          {link.label}
        </a>
      </span>
    ))}
  </>
));

NavLinks.displayName = 'NavLinks';

export default NavLinks;
