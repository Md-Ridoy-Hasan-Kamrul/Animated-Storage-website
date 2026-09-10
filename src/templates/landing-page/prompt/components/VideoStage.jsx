import React from 'react';

/**
 * Prompt 1G — dual girl videos, full-bleed.
 * Stage layer receives mouse parallax (L/R/T/B).
 */
const VideoStage = ({
  stageRef,
  leftRef,
  rightRef,
  leftSrc,
  rightSrc,
  ready,
  activeSide = 'right',
}) => {
  const showRight = activeSide !== 'left';

  return (
    <div
      id="main-canvas"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden bg-white"
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        ref={stageRef}
        className="prompt-hero-stage absolute inset-[-6%] h-[112%] w-[112%] will-change-transform"
        style={{ transform: 'translate3d(0,0,0) scale(1.12)' }}
      >
        <video
          ref={leftRef}
          src={leftSrc}
          muted
          playsInline
          preload="auto"
          className="prompt-hero-video absolute inset-0 h-full w-full object-cover object-center"
          style={{ display: showRight ? 'none' : 'block' }}
        />
        <video
          ref={rightRef}
          src={rightSrc}
          muted
          playsInline
          preload="auto"
          className="prompt-hero-video absolute inset-0 h-full w-full object-cover object-center"
          style={{ display: showRight ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};

export default VideoStage;
