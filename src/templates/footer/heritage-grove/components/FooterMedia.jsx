import React from 'react';
import { HERO_POSTER, HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';

const FooterMedia = () => {
  const videoRef = useHeroVideo();

  return (
    <div className="footer-media" aria-hidden="true">
      <video
        ref={videoRef}
        className="footer-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
      >
        <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
};

export default FooterMedia;
