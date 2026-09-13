import React, { memo } from 'react';
import { HERO_POSTER_LOCAL, HERO_VIDEO_LOCAL } from '../content';
import { layerOpacities } from '../utils/layers';

const fadeClass = 'absolute inset-0 h-full w-full object-cover transition-opacity duration-500';

const ScrollVideo = memo(({ videoRef, canvasRef, hasVideoFrame, cacheReady }) => {
  const layers = layerOpacities(hasVideoFrame, cacheReady);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden="true"
    >
      <img
        src={HERO_POSTER_LOCAL}
        alt=""
        className={fadeClass}
        style={{ opacity: layers.poster }}
      />
      <video
        ref={videoRef}
        src={HERO_VIDEO_LOCAL}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className={fadeClass}
        style={{ opacity: layers.video }}
      />
      <canvas
        ref={canvasRef}
        className={fadeClass}
        style={{ opacity: layers.canvas }}
      />
    </div>
  );
});

ScrollVideo.displayName = 'ScrollVideo';

export default ScrollVideo;
