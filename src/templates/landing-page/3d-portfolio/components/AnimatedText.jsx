import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedText = ({ text, className = '', style }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, index) => (
        <Char key={`${char}-${index}`} char={char} index={index} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
};

const Char = ({ char, index, total, progress }) => {
  const start = index / total;
  const end = Math.min(1, start + 1 / total);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
