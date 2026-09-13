import React from 'react';
import {
  GLOBE_CENTER,
  GLOBE_EDGE,
  GLOBE_ELLIPSE_MID,
  GLOBE_ELLIPSE_NEAR,
  GLOBE_FAR,
  GLOBE_RADIUS,
  GLOBE_STROKE,
  GLOBE_VIEWBOX,
} from '../constants';

const WireGlobe = () => (
  <svg
    viewBox={GLOBE_VIEWBOX}
    fill="none"
    stroke="currentColor"
    strokeWidth={GLOBE_STROKE}
    className="synth-globe"
    aria-hidden="true"
  >
    <circle cx={GLOBE_CENTER} cy={GLOBE_CENTER} r={GLOBE_RADIUS} />
    <line x1={GLOBE_EDGE} y1={GLOBE_CENTER} x2={GLOBE_FAR} y2={GLOBE_CENTER} />
    <ellipse cx={GLOBE_CENTER} cy={GLOBE_CENTER} rx={GLOBE_RADIUS} ry={GLOBE_ELLIPSE_NEAR} />
    <ellipse cx={GLOBE_CENTER} cy={GLOBE_CENTER} rx={GLOBE_RADIUS} ry={GLOBE_ELLIPSE_MID} />
    <line x1={GLOBE_CENTER} y1={GLOBE_EDGE} x2={GLOBE_CENTER} y2={GLOBE_FAR} />
    <ellipse cx={GLOBE_CENTER} cy={GLOBE_CENTER} rx={GLOBE_ELLIPSE_NEAR} ry={GLOBE_RADIUS} />
    <ellipse cx={GLOBE_CENTER} cy={GLOBE_CENTER} rx={GLOBE_ELLIPSE_MID} ry={GLOBE_RADIUS} />
  </svg>
);

export default WireGlobe;
