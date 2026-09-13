import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CHEVRON_SM, MITHA_ALT, MITHA_CTA, MITHA_ROLE, MITHA_TITLE } from '../constants';
import { MITHA_PORTRAIT } from '../content';

const MithaCard = () => (
  <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
    <img
      src={MITHA_PORTRAIT}
      alt={MITHA_ALT}
      className="h-24 w-20 rounded-lg object-cover"
    />
    <div className="flex flex-col gap-1.5 pr-2">
      <p className="text-sm font-medium text-white">{MITHA_TITLE}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
        {MITHA_ROLE}
      </p>
      <a
        href="#contact"
        className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
      >
        {MITHA_CTA}
        <ChevronRight size={CHEVRON_SM} aria-hidden="true" />
      </a>
    </div>
  </div>
);

export default MithaCard;
