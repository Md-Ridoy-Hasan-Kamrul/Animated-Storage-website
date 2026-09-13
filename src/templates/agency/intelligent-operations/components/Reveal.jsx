import React from 'react';
import { useReveal } from '../hooks/useReveal';

const Reveal = ({ delayMs = 0, className = '', children }) => {
  const { ref, shown } = useReveal();
  const stateClass = shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';

  return (
    <div
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${stateClass} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
