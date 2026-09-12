import React from 'react';
import { CARE_LINKS, HERITAGE_LINKS, SHOP_LINKS } from '../constants';
import BrandBlock from './BrandBlock';
import FooterBottom from './FooterBottom';
import FooterColumn from './FooterColumn';
import FooterMedia from './FooterMedia';
import Newsletter from './Newsletter';

const SiteFooter = () => (
  <footer className="site-footer">
    <FooterMedia />
    <div className="footer-inner">
      <div className="footer-grid">
        <BrandBlock />
        <FooterColumn title="Shop" ariaLabel="Shop" links={SHOP_LINKS} />
        <FooterColumn title="Heritage" ariaLabel="Heritage" links={HERITAGE_LINKS} />
        <FooterColumn title="Care & Service" ariaLabel="Care and service" links={CARE_LINKS} />
        <Newsletter />
      </div>
      <FooterBottom />
    </div>
  </footer>
);

export default SiteFooter;
