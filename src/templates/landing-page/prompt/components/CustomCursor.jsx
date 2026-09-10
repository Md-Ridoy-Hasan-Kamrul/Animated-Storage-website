import React from 'react';

/**
 * Desktop custom cursor — circle with left/right arrows (design hero hint).
 */
const CustomCursor = ({ cursorRef, hidden }) => {
  if (hidden) return null;
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden mix-blend-exclusion lg:block"
      style={{ transform: 'translate(-50%, -50%)', opacity: 0 }}
      aria-hidden
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22.75" fill="none" stroke="#fff" strokeWidth="2.5" />
        {/* ← */}
        <path
          d="M20 24H12M12 24L16 20M12 24L16 28"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* → */}
        <path
          d="M28 24H36M36 24L32 20M36 24L32 28"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
