import React from 'react';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';

const HeroVideo = ({ videoRef }) => (
  <div className="cc-film-wrap order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      className="cc-film w-full h-full object-cover"
    >
      <source src={HERO_VIDEO} type="video/mp4" />
      <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
    </video>
  </div>
);

export default HeroVideo;
