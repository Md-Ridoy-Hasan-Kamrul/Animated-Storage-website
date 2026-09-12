import React from 'react';
import { HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';

const BackgroundVideo = () => {
  const videoRef = useHeroVideo();

  return (
    <video
      ref={videoRef}
      src={HERO_VIDEO_LOCAL}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover lg:scale-[1.2]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
};

export default BackgroundVideo;
