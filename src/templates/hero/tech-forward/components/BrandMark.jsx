import React from 'react';
import { BRAND_NAME, LOGO_ROTATE_DEG } from '../constants';

const BrandMark = () => (
  <span className="tf-brand">
    <svg className="tf-logo" viewBox="0 0 28 28" aria-hidden="true">
      <rect
        x="3"
        y="8"
        width="14"
        height="5"
        rx="2.5"
        fill="#000"
        transform={`rotate(${LOGO_ROTATE_DEG} 10 10.5)`}
      />
      <rect
        x="11"
        y="15"
        width="14"
        height="5"
        rx="2.5"
        fill="#000"
        transform={`rotate(${LOGO_ROTATE_DEG} 18 17.5)`}
      />
    </svg>
    <span className="tf-brand-name">{BRAND_NAME}</span>
  </span>
);

export default BrandMark;
