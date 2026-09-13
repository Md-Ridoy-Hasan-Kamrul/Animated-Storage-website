import React, { memo } from 'react';
import SightCard from './SightCard';

const SightsSlider = memo(({ copies, activeSight, jumping, trackRef, onSelect }) => (
  <section className="sights-slider" id="routes" aria-label="Mostar sights slider">
    <div ref={trackRef} className={`sights-track${jumping ? ' is-jumping' : ''}`}>
      {copies.map((sight) => (
        <SightCard
          key={sight.key}
          sight={sight}
          isActive={sight.sightIndex === activeSight}
          onSelect={onSelect}
        />
      ))}
    </div>
  </section>
));

SightsSlider.displayName = 'SightsSlider';

export default SightsSlider;
