import React, { memo } from 'react';

const SightCard = memo(({ sight, isActive, onSelect }) => (
  <article
    className={`sight-card${isActive ? ' is-active' : ''}`}
    tabIndex={0}
    role="button"
    aria-label={sight.ariaLabel}
    data-sight-index={sight.sightIndex}
    onClick={() => onSelect(sight.sightIndex)}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(sight.sightIndex);
      }
    }}
  >
    <span className="sight-kicker">{sight.kicker}</span>
    <img className="sight-pin" src={sight.pin} alt="" />
    <h3>{sight.title}</h3>
    <p>{sight.copy}</p>
  </article>
));

SightCard.displayName = 'SightCard';

export default SightCard;
