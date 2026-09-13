import React from 'react';
import { motion } from 'framer-motion';
import { ENTRANCE_VISIBLE } from '../constants';
import { HERO_VIDEO, HERO_VIDEO_LOCAL } from '../content';
import { useHeroVideo } from '../hooks/useHeroVideo';
import { entranceProps, videoVariants } from '../utils/motionPresets';

const HeroVideo = ({ entrance = ENTRANCE_VISIBLE }) => {
  const videoRef = useHeroVideo();

  return (
    <motion.div className="tf-video-wrap" {...entranceProps(videoVariants)} animate={entrance}>
      <video ref={videoRef} autoPlay muted playsInline loop preload="auto" className="tf-video">
        <source src={HERO_VIDEO} type="video/mp4" />
        <source src={HERO_VIDEO_LOCAL} type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default HeroVideo;
