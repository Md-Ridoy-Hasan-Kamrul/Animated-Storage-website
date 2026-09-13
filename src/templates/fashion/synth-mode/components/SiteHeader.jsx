import React from 'react';
import { ShoppingBag } from 'lucide-react';
import {
  BRAND,
  BRAND_DEGREE,
  CART_BADGE_CLASS,
  HEADER_CLASS,
  ICON_STROKE,
  NAV_COLLECTIONS,
  NAV_JOURNAL,
  NAV_SHOP,
} from '../constants';

const SiteHeader = ({ cartCount, onOpen, onClose }) => (
  <header className={HEADER_CLASS}>
    <button type="button" className="synth-logo font-orbitron" onClick={onClose} aria-label={BRAND}>
      <span>{BRAND}</span>
      <span className="synth-logo-deg -mt-0.5 ml-0.5">{BRAND_DEGREE}</span>
    </button>

    <nav className="synth-nav font-jakarta" aria-label="Primary">
      <button type="button" className="synth-nav-link" onClick={() => onOpen('shop')}>
        {NAV_SHOP}
      </button>
      <button type="button" className="synth-nav-link" onClick={() => onOpen('collections')}>
        {NAV_COLLECTIONS}
      </button>
      <button type="button" className="synth-nav-link" onClick={() => onOpen('journal')}>
        {NAV_JOURNAL}
      </button>
      <span className="text-gray-400" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className="relative synth-nav-link"
        onClick={() => onOpen('cart')}
        aria-label={cartCount ? `Shopping bag, ${cartCount} items` : 'Shopping bag'}
      >
        <ShoppingBag className="synth-icon" strokeWidth={ICON_STROKE} />
        {cartCount > 0 ? (
          <span className={CART_BADGE_CLASS}>{cartCount}</span>
        ) : null}
      </button>
    </nav>
  </header>
);

export default SiteHeader;
