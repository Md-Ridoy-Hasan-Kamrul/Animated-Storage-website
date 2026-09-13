import React, { memo } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants';
import { HERO_VIDEO_LOCAL } from '../content';

const VideoStage = memo(({ videoRef, canvasRef, canvasLive }) => (
  <>
    <video
      ref={videoRef}
      className="vectrus-video"
      src={HERO_VIDEO_LOCAL}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
    />
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className={`vectrus-canvas ${canvasLive ? 'is-live' : ''}`}
      aria-hidden="true"
    />
  </>
));

VideoStage.displayName = 'VideoStage';

export default VideoStage;
