import React, { memo } from 'react';
import { FALCON_POSTER, HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { HL1_COPY, HL2_COPY, TALL_VIDEO_ARIA } from '../constants';

const VideoSources = () => (
  <>
    <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
    <source src={HERO_VIDEO} type="video/mp4" />
  </>
);

const PhotoPanel = memo(({ photoRef, heroRef, hlWrapRef, children }) => (
  <section className="photo" ref={photoRef}>
    <video
      className="photo-img photo-img--tall"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={FALCON_POSTER}
      aria-label={TALL_VIDEO_ARIA}
    >
      <VideoSources />
    </video>
    <video
      className="photo-img photo-img--wide"
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={FALCON_POSTER}
    >
      <VideoSources />
    </video>
    <div className="scrim" />
    <div className="hero" id="hero" ref={heroRef}>
      {children}
      <div className="hl-wrap" ref={hlWrapRef}>
        <span className="hl" id="hl1">
          {HL1_COPY}
        </span>
        <span className="hl" id="hl2">
          {HL2_COPY}
        </span>
      </div>
    </div>
  </section>
));

PhotoPanel.displayName = 'PhotoPanel';

export default PhotoPanel;
