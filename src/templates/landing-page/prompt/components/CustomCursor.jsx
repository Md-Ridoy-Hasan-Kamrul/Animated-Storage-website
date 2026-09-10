import React from 'react';

/**
 * Desktop custom cursor — circle + decorative glyph (prompt 1A).
 * Visual reads as はち / left-right hint on exclusion blend.
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
        <text
          x="24"
          y="29"
          textAnchor="middle"
          fill="#fff"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          はち
        </text>
      </svg>
    </div>
  );
};

export default CustomCursor;
