import React, { memo } from 'react';

const HamburgerButton = memo(({ isLight, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label="Open menu"
    className="relative z-50 flex flex-col gap-[5px] lg:hidden"
  >
    <span className={`h-[2px] w-6 ${isLight ? 'bg-[#1D3045]' : 'bg-white'}`} />
    <span className={`h-[2px] w-6 ${isLight ? 'bg-[#1D3045]' : 'bg-white'}`} />
    <span className={`h-[2px] w-4 ${isLight ? 'bg-[#1D3045]' : 'bg-white'}`} />
  </button>
));

HamburgerButton.displayName = 'HamburgerButton';

export default HamburgerButton;
