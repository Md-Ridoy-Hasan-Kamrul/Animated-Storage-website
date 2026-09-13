import React from 'react';
import { BRACKET_PATHS, BRACKET_STROKE, BRACKET_VIEWBOX } from '../constants';

const CornerBracket = ({ corner, className }) => (
  <svg
    viewBox={BRACKET_VIEWBOX}
    fill="none"
    stroke="currentColor"
    strokeWidth={BRACKET_STROKE}
    className={className}
    aria-hidden="true"
  >
    <path d={BRACKET_PATHS[corner]} />
  </svg>
);

export default CornerBracket;
