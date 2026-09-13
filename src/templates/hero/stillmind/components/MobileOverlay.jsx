import React, { memo } from 'react';
import {
  CTA_LABEL,
  NAV_LINKS,
  OVERLAY_EASE,
  OVERLAY_MS,
  STAGGER_START_MS,
  STAGGER_STEP_MS,
} from '../constants';

const MobileOverlay = memo(({ isOpen, onNavigate, onCta }) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm md:hidden ${
      isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
    }`}
    style={{
      transitionProperty: 'opacity',
      transitionDuration: `${OVERLAY_MS}ms`,
      transitionTimingFunction: OVERLAY_EASE,
    }}
  >
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-8">
      {NAV_LINKS.map((link, index) => (
        <a
          key={link.id}
          href={link.href}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(link.href);
          }}
          className={`text-3xl text-white ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{
            fontFamily: 'system-ui, sans-serif',
            transitionProperty: 'transform, opacity',
            transitionDuration: `${OVERLAY_MS}ms`,
            transitionTimingFunction: OVERLAY_EASE,
            transitionDelay: `${STAGGER_START_MS + index * STAGGER_STEP_MS}ms`,
          }}
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={onCta}
        className={`mt-4 rounded-full bg-white px-8 py-3.5 text-base text-black ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        style={{
          fontFamily: 'system-ui, sans-serif',
          transitionProperty: 'transform, opacity',
          transitionDuration: `${OVERLAY_MS}ms`,
          transitionTimingFunction: OVERLAY_EASE,
          transitionDelay: `${STAGGER_START_MS + NAV_LINKS.length * STAGGER_STEP_MS}ms`,
        }}
      >
        {CTA_LABEL}
      </button>
    </div>
  </div>
));

MobileOverlay.displayName = 'MobileOverlay';

export default MobileOverlay;
