import React from 'react';
import { LEGAL_LINKS, SOCIAL_LINKS } from '../constants';
import { SOCIAL_ICONS } from './GroveIcons';

const FooterBottom = () => (
  <div className="footer-bottom">
    <div className="socials">
      {SOCIAL_LINKS.map((item) => {
        const Icon = SOCIAL_ICONS[item.id];
        return (
          <a key={item.id} href="#" aria-label={item.label}>
            <Icon />
          </a>
        );
      })}
    </div>
    <nav className="legal" aria-label="Legal">
      {LEGAL_LINKS.map((label) => (
        <a key={label} href="#">
          {label}
        </a>
      ))}
    </nav>
  </div>
);

export default FooterBottom;
