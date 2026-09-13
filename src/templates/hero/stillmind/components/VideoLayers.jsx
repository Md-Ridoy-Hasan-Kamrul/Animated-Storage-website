import React, { memo } from 'react';
import { CROSSFADE_MS } from '../constants';
import { VIDEOS } from '../content';

const VideoLayers = memo(({ activeVideo, setVideoRef }) => (
  <div className="pointer-events-none absolute inset-0 z-0">
    {VIDEOS.map((video, index) => (
      <video
        key={video.label}
        ref={setVideoRef(index)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
          activeVideo === index ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    ))}
  </div>
));

VideoLayers.displayName = 'VideoLayers';

export default VideoLayers;
