import React, { memo } from 'react';
import { GalleryHeading } from '../effects/gallery-heading';

/**
 * Empty-state for categories with no templates yet.
 * GalleryHeading Matte Rise (`rising-diagonal`); text stays Coming Soon.
 */
const ComingSoonTube = memo(({ text = 'Coming Soon', className = '' }) => (
  <div
    className={`coming-soon-tube-container${className ? ` ${className}` : ''}`}
    aria-label={text}
  >
    <GalleryHeading
      variant="rising-diagonal"
      mode="dark"
      font="sans"
      weight="400"
      headlineSize={1.15}
      hue={0}
      saturation={1}
      brightness={1}
      documentSrc="/effects/gallery-heading-coming-soon.html"
      autoPlay
    />
  </div>
));

ComingSoonTube.displayName = 'ComingSoonTube';

export default ComingSoonTube;
