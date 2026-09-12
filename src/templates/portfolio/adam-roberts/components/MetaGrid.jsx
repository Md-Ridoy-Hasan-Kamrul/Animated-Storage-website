import React from 'react';
import { SERVICES_LIST } from '../constants';
import { BRAND_BLURB_LINES, WHAT_I_DO } from '../content';

const MetaLabel = ({ children }) => (
  <p className="font-pixel mb-3 text-base uppercase tracking-widest text-white/50">{children}</p>
);

const NameBlock = () => (
  <div>
    <h2 className="text-lg font-normal leading-tight tracking-wide md:text-xl">
      ADAM
      <br />
      <span className="font-pixel text-2xl md:text-3xl">ROBERTS</span>
    </h2>
    <p className="mt-3 text-[10px] text-white/50">*</p>
    <p className="font-pixel mt-1 text-xs leading-relaxed text-white/60">
      {BRAND_BLURB_LINES.map((line) => (
        <React.Fragment key={line}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  </div>
);

const RoleBlock = () => (
  <div className="text-right lg:text-left">
    <h2 className="text-lg font-normal leading-tight tracking-wide md:text-xl">
      DESIGN &amp;
      <br />
      <span className="font-pixel text-2xl md:text-3xl">ENGINEERING</span>
    </h2>
  </div>
);

const WhatIDoBlock = () => (
  <div>
    <MetaLabel>What I Do</MetaLabel>
    <p className="max-w-[220px] text-sm leading-relaxed text-white/90">{WHAT_I_DO}</p>
  </div>
);

const ServicesBlock = () => (
  <div className="text-right lg:text-left">
    <MetaLabel>Services</MetaLabel>
    <ul className="space-y-0.5 text-sm leading-relaxed text-white/90">
      {SERVICES_LIST.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const MetaGrid = () => (
  <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
    <NameBlock />
    <RoleBlock />
    <WhatIDoBlock />
    <ServicesBlock />
  </div>
);

export default MetaGrid;
