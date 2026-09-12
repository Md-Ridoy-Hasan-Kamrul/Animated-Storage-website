import React from 'react';
import { HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';

const BackgroundVideo = () => {
  const videoRef = useHeroVideo();

  return (
    <video
      ref={videoRef}
      src={HERO_VIDEO_LOCAL}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
};

export default BackgroundVideo;
