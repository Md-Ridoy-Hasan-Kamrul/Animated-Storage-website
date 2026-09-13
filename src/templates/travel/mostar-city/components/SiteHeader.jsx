import React, { memo } from 'react';
import { LOGO_LABEL, NAV_LINKS } from '../constants';

const SiteHeader = memo(() => (
  <header className="site-header" aria-label="Primary navigation">
    <a className="site-logo" href="#cinema">
      {LOGO_LABEL}
    </a>
    <nav className="site-nav" aria-label="Main menu">
      {NAV_LINKS.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
    <button type="button" className="language-switcher" aria-label="Change language">
      <span>EN</span>
      <span aria-hidden="true">⌄</span>
    </button>
  </header>
));

SiteHeader.displayName = 'SiteHeader';

export default SiteHeader;
