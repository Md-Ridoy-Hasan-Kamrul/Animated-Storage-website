import React, { memo } from 'react';
import { HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';

const BackgroundVideo = memo(() => {
  const videoRef = useHeroVideo();

  return (
    <video
      ref={videoRef}
      src={HERO_VIDEO_LOCAL}
      className="foldcraft-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';

export default BackgroundVideo;
