import React, { memo } from 'react';
import { useAutoplayRetry } from '../hooks/useAutoplayRetry';

const LoopFilm = memo(({ className, localSrc, remoteSrc, width, height }) => {
  const videoRef = useAutoplayRetry();

  return (
    <video
      ref={videoRef}
      className={className}
      src={localSrc}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={localSrc} type='video/mp4; codecs="avc1.640029"' />
      <source src={remoteSrc} type="video/mp4" />
    </video>
  );
});

LoopFilm.displayName = 'LoopFilm';

export default LoopFilm;
