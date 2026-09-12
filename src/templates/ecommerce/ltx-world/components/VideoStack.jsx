import React, { memo } from 'react';
import { CLIP_KEYS } from '../constants';
import { CLIP_URLS } from '../content';

const VideoStack = memo(({ videosRef, visibleKey }) =>
  CLIP_KEYS.map((key) => (
    <video
      key={key}
      ref={(node) => {
        videosRef.current[key] = node;
      }}
      className={`media${visibleKey === key ? ' is-visible' : ''}`}
      src={CLIP_URLS[key]}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )),
);

VideoStack.displayName = 'VideoStack';

export default VideoStack;
