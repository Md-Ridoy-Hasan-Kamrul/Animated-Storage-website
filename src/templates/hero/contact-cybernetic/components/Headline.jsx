import React from 'react';
import { motion } from 'framer-motion';
import {
  DESCRIPTION_DELAY_S,
  DESCRIPTION_LEAD,
  DESCRIPTION_TAIL,
  HEADLINE_DURATION_S,
  HEADLINE_TEXT,
  HEADLINE_Y,
  TYPEWRITER_DELAY_MS,
  TYPEWRITER_SPEED_MS,
} from '../constants';
import { useTypewriter } from '../hooks/useTypewriter';

const Headline = () => {
  const { displayed, done } = useTypewriter(HEADLINE_TEXT, TYPEWRITER_SPEED_MS, TYPEWRITER_DELAY_MS);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: HEADLINE_Y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HEADLINE_DURATION_S }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
          {displayed}
          {done ? null : (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
          )}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: HEADLINE_Y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HEADLINE_DURATION_S, delay: DESCRIPTION_DELAY_S }}
      >
        <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
          {DESCRIPTION_LEAD} <br /> {DESCRIPTION_TAIL}
        </p>
      </motion.div>
    </>
  );
};

export default Headline;
