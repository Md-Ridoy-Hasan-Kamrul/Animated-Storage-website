import React from 'react';

/**
 * Dual portrait videos (girl) — full-bleed hero stage.
 * Both stay mounted (opacity swap) so mouse scrub seeking stays reliable.
 */
const VideoStage = ({ leftRef, rightRef, leftSrc, rightSrc, ready }) => (
  <div
    id="main-canvas"
    className="pointer-events-none fixed left-0 top-[220px] z-0 h-[calc(100vh-220px)] w-screen overflow-hidden bg-white lg:inset-0 lg:h-full lg:w-full"
    style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.35s ease' }}
    aria-hidden={!ready}
  >
    <video
      ref={leftRef}
      src={leftSrc}
      muted
      playsInline
      preload="auto"
      className="prompt-hero-video absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0, zIndex: 1 }}
    />
    <video
      ref={rightRef}
      src={rightSrc}
      muted
      playsInline
      preload="auto"
      className="prompt-hero-video absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 1, zIndex: 2 }}
    />
  </div>
);

export default VideoStage;
