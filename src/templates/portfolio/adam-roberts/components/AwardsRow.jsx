import React from 'react';
import { AWARDS } from '../constants';

const AwardsRow = () => (
  <div className="flex flex-wrap items-stretch gap-2 self-start text-sm text-white/80 sm:gap-3 lg:self-end">
    {AWARDS.map((award) => (
      <div
        key={award.id}
        className="flex items-center gap-2 bg-[#0B0B0B] px-3 py-2 sm:px-4"
      >
        <span className={award.nameClass}>{award.name}</span>
        <span className="text-xs text-white/50">{award.count}</span>
      </div>
    ))}
  </div>
);

export default AwardsRow;
