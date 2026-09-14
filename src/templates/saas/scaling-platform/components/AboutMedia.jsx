import React, { memo } from 'react';
import { ABOUT_VIDEO, ABOUT_VIDEO_HEIGHT, ABOUT_VIDEO_LOCAL, ABOUT_VIDEO_WIDTH } from '../content';
import LoopFilm from './LoopFilm';

const AboutMedia = memo(() => (
  <div className="sp-about-media">
    <LoopFilm
      className="sp-about-video"
      localSrc={ABOUT_VIDEO_LOCAL}
      remoteSrc={ABOUT_VIDEO}
      width={ABOUT_VIDEO_WIDTH}
      height={ABOUT_VIDEO_HEIGHT}
    />
    <div className="sp-about-tint" aria-hidden="true" />
  </div>
));

AboutMedia.displayName = 'AboutMedia';

export default AboutMedia;
