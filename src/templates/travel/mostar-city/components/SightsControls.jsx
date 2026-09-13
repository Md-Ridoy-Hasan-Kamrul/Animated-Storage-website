import React, { memo } from 'react';

const SightsControls = memo(({ ready, onPrev, onNext }) => (
  <div
    className={`sights-controls${ready ? ' is-ready' : ''}`}
    aria-label="Slider controls"
  >
    <button type="button" className="sight-nav sight-prev" aria-label="Previous sight" onClick={onPrev}>
      ←
    </button>
    <button type="button" className="sight-nav sight-next" aria-label="Next sight" onClick={onNext}>
      →
    </button>
  </div>
));

SightsControls.displayName = 'SightsControls';

export default SightsControls;
