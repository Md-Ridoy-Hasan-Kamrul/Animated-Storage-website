import React, { memo } from 'react';
import { CTA_LABEL } from '../constants';

const VARIANT_CLASS = {
  nav: 'rounded-full px-4 py-2 text-[12px] text-foreground transition-transform hover:scale-[1.03] min-[375px]:px-5 min-[375px]:py-2.5 min-[375px]:text-sm md:px-6',
  hero: 'mt-8 cursor-pointer rounded-full px-8 py-3.5 text-sm text-foreground transition-transform hover:scale-[1.03] min-[375px]:mt-10 min-[375px]:px-10 min-[375px]:py-4 min-[375px]:text-base md:mt-12 md:px-14 md:py-5',
};

const LiquidGlassButton = memo(({ variant = 'hero', className = '', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`liquid-glass ${VARIANT_CLASS[variant] || VARIANT_CLASS.hero} ${className}`}
  >
    {CTA_LABEL}
  </button>
));

LiquidGlassButton.displayName = 'LiquidGlassButton';

export default LiquidGlassButton;
