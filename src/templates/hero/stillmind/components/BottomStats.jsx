import React, { memo } from 'react';
import { STATS } from '../constants';

const BottomStats = memo(() => (
  <div
    className="relative z-[2] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 pb-5 text-xs text-white/70 sm:gap-x-4 sm:px-6 sm:pb-7 sm:text-sm md:px-10"
    style={{ fontFamily: 'system-ui, sans-serif' }}
  >
    {STATS.map((stat, index) => (
      <span key={stat} className="inline-flex items-center gap-3 sm:gap-4">
        {index > 0 ? (
          <span className="hidden text-white/40 sm:inline" aria-hidden="true">
            |
          </span>
        ) : null}
        <span>{stat}</span>
      </span>
    ))}
  </div>
));

BottomStats.displayName = 'BottomStats';

export default BottomStats;
