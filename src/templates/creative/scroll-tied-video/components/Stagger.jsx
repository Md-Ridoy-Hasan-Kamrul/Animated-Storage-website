import React, { memo } from 'react';

const Stagger = memo(({ show, delayMs = 0, className = '', children }) => (
  <div
    className={`vectrus-stagger ${show ? 'is-in' : ''} ${className}`}
    style={{ '--stagger-delay': `${delayMs}ms` }}
  >
    {children}
  </div>
));

Stagger.displayName = 'Stagger';

export default Stagger;
