import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { VIDEO_CLASS, VIDEO_WRAP_CLASS } from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';
import { videoMotion } from '../utils/motionPresets';

const HeroVideo = memo(() => {
  const videoRef = useHeroVideo();

  return (
    <motion.div className={VIDEO_WRAP_CLASS} {...videoMotion}>
      <video
        ref={videoRef}
        className={VIDEO_CLASS}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
        <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
      </video>
    </motion.div>
  );
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
