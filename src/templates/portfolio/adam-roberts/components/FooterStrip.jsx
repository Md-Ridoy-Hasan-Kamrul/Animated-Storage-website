import React from 'react';
import { FOOTER_AVAILABILITY, FOOTER_STATS } from '../content';

const FooterStrip = () => (
  <div className="mt-4 grid grid-cols-1 gap-2 pt-4 sm:mt-5 sm:grid-cols-2 sm:gap-4">
    <p className="text-xs text-white/60">
      {FOOTER_AVAILABILITY}
      <a href="#" className="text-red-500 transition-colors hover:text-red-400">
        Schedule a call
      </a>
    </p>
    <p className="text-xs text-white/60 sm:text-right">{FOOTER_STATS}</p>
  </div>
);

export default FooterStrip;
