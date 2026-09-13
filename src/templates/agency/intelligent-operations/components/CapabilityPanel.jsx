import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  CAPABILITIES,
  CAPABILITY_DELAY_START,
  CAPABILITY_DELAY_STEP,
  CHEVRON_MD,
} from '../constants';
import { staggerDelay } from '../utils/delays';
import Reveal from './Reveal';

const CapabilityPanel = () => (
  <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
    {CAPABILITIES.map((item, index) => {
      const isLast = index === CAPABILITIES.length - 1;
      return (
        <Reveal
          key={item.index}
          delayMs={staggerDelay(CAPABILITY_DELAY_START, CAPABILITY_DELAY_STEP, index)}
        >
          <div className={`group flex gap-5 py-5 ${isLast ? '' : 'border-b border-white/15'}`}>
            <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
              {item.index}
            </span>
            <div>
              <p className="flex items-center gap-1 text-base font-medium text-white sm:text-lg">
                {item.title}
                <ChevronRight
                  size={CHEVRON_MD}
                  className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                  aria-hidden="true"
                />
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
            </div>
          </div>
        </Reveal>
      );
    })}
  </div>
);

export default CapabilityPanel;
