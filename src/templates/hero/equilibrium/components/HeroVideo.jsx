import React, { memo } from 'react';
import { VIDEO_CLASS } from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';

const HeroVideo = memo(() => {
  const videoRef = useHeroVideo();

  return (
    <video
      ref={videoRef}
      className={VIDEO_CLASS}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
