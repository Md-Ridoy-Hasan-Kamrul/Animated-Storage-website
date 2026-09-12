import React, { useRef } from 'react';
import { useHlsVideo } from '../hooks/useHlsVideo';

/**
 * Full-bleed Mux HLS background video.
 * @param {{ flipY?: boolean, overlayClassName?: string, className?: string }} props
 */
const HlsBackgroundVideo = ({
  flipY = false,
  overlayClassName = 'bg-black/20',
  className = '',
}) => {
  const videoRef = useRef(null);
  useHlsVideo(videoRef);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
          flipY ? 'scale-y-[-1]' : ''
        }`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
};

export default HlsBackgroundVideo;
