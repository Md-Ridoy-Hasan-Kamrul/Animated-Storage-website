import React, { memo } from 'react';
import { HERO_VIDEO_LOCAL } from '../content';

const VideoBackground = memo(({ videoRef }) => (
  <video
    ref={videoRef}
    className="mainframe-video"
    src={HERO_VIDEO_LOCAL}
    muted
    playsInline
    preload="auto"
    disablePictureInPicture
    aria-hidden="true"
  />
));

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;
