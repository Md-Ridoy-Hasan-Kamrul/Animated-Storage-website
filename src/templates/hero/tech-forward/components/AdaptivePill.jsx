import React from 'react';
import { ADAPTIVE_LABEL } from '../constants';

const AdaptivePill = () => (
  <div className="tf-adaptive">
    <span className="tf-circle tf-circle-dark" aria-hidden="true">
      <svg viewBox="0 0 12 12" className="tf-dots">
        <circle cx="3" cy="3" r="1.35" fill="#fff" />
        <circle cx="9" cy="3" r="1.35" fill="#fff" />
        <circle cx="3" cy="9" r="1.35" fill="#fff" />
        <circle cx="9" cy="9" r="1.35" fill="#fff" />
      </svg>
    </span>
    <span className="tf-adaptive-label">{ADAPTIVE_LABEL}</span>
  </div>
);

export default AdaptivePill;
