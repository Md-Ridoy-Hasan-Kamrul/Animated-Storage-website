import React from 'react';
import { BRAND_BLURB, BRAND_NAME, CONTACTS } from '../constants';
import { BrandMark, CONTACT_ICONS } from './GroveIcons';

const BrandBlock = () => (
  <div className="brand">
    <div className="brand-lockup">
      <BrandMark />
      <h2 className="brand-name">{BRAND_NAME}</h2>
    </div>
    <p className="brand-blurb">{BRAND_BLURB}</p>
    <ul className="contact-list">
      {CONTACTS.map((item) => {
        const Icon = CONTACT_ICONS[item.icon];
        return (
          <li key={item.id}>
            <Icon />
            {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
          </li>
        );
      })}
    </ul>
  </div>
);

export default BrandBlock;
