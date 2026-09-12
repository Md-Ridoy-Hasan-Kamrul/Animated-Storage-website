import React, { memo } from 'react';

const LtxLogo = memo(() => (
  <svg viewBox="0 0 75 32" fill="none" aria-hidden="true">
    <path fill="#fff" d="M0 3.2h7.2v18.4H21.6V28H0z" />
    <path fill="#fff" d="M26.4 3.2h22.4v6.4h-7.6V28h-7.2V9.6H26.4z" />
    <path
      fill="#fff"
      d="M52.4 3.2h6.6l3.7 8.2 3.7-8.2H73L66.2 16 73 28.8h-6.6l-3.7-8.2-3.7 8.2h-6.6L59.2 16z"
    />
  </svg>
));

LtxLogo.displayName = 'LtxLogo';

export default LtxLogo;
