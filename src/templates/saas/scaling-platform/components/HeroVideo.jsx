import React, { memo } from 'react';
import { HERO_VIDEO, HERO_VIDEO_HEIGHT, HERO_VIDEO_LOCAL, HERO_VIDEO_WIDTH } from '../content';
import LoopFilm from './LoopFilm';

const HeroVideo = memo(() => (
  <LoopFilm
    className="sp-hero-video"
    localSrc={HERO_VIDEO_LOCAL}
    remoteSrc={HERO_VIDEO}
    width={HERO_VIDEO_WIDTH}
    height={HERO_VIDEO_HEIGHT}
  />
));

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
