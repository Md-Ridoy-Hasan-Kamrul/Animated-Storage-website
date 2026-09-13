import React, { memo } from 'react';

const Enter = memo(({ show, delayMs = 0, className = '', children }) => (
  <div
    className={`vectrus-enter ${show ? 'is-in' : ''} ${className}`}
    style={{ '--stagger-delay': `${delayMs}ms` }}
  >
    {children}
  </div>
));

Enter.displayName = 'Enter';

export default Enter;
