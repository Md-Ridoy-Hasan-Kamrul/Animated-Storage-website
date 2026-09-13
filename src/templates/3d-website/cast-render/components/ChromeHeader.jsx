import React, { memo } from 'react';
import { BRAND_NAME, NAV_LINKS } from '../constants';

const ChromeHeader = memo(({ onNavigate }) => (
  <header className="chrome">
    <div className="mark">
      <span className="mark-star" aria-hidden="true">
        &#10037;
      </span>
      &nbsp;{BRAND_NAME}
    </div>
    <nav className="nav">
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          className={link.pill ? 'pill' : undefined}
          href={link.href}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.href);
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  </header>
));

ChromeHeader.displayName = 'ChromeHeader';

export default ChromeHeader;
