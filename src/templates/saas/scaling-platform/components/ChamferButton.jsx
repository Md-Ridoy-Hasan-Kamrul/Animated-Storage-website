import React, { memo } from 'react';

const ChamferButton = memo(({ href, children, className = '' }) => (
  <span className={`sp-cta-row ${className}`.trim()}>
    <a className="sp-cta" href={href}>
      {children}
    </a>
    <span className="sp-cta-rule" aria-hidden="true" />
  </span>
));

ChamferButton.displayName = 'ChamferButton';

export default ChamferButton;
