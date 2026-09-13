import React, { memo } from 'react';

const VideoStage = memo(({ clipRef }) => (
  <div className="stage">
    <video
      id="clip"
      ref={clipRef}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
    />
    <div className="veil" />
    <div className="grain" />
  </div>
));

VideoStage.displayName = 'VideoStage';

export default VideoStage;
