import React from 'react';

const OutroLayer = ({ overlayRef, footerRef }) => (
  <>
    <div
      id="outro-overlay"
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[12] bg-white"
      style={{ opacity: 0 }}
    />
    <div
      id="outro-footer"
      ref={footerRef}
      className="pointer-events-none fixed bottom-6 left-4 z-20 flex w-[calc(100%-2rem)] justify-between gap-10 mix-blend-exclusion sm:bottom-8 sm:left-4 sm:w-auto sm:justify-start sm:gap-20"
      style={{ opacity: 0 }}
    >
      <span className="text-[11px] uppercase tracking-[-0.02em] text-white sm:text-[13px]">
        PRMPT (R) 2026
      </span>
      <span className="text-[11px] uppercase tracking-[-0.02em] text-white sm:text-[13px]">
        PRIVACY POLICY
      </span>
    </div>
  </>
);

export default OutroLayer;
