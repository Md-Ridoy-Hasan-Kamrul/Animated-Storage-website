import React from 'react';
import { motion } from 'framer-motion';
import { LETTER_BLOCK } from '../constants';

const N_POLYS = [
  '0,0 14,0 14,100 0,100',
  '200,0 214,0 214,100 200,100',
  '0,0 33,0 214,100 181,100',
];

const H_POLYS = [
  '0,0 14,0 14,100 0,100',
  '200,0 214,0 214,100 200,100',
  '14,43 200,43 200,57 14,57',
];

const M_POLYS = [
  '0,0 14,0 14,100 0,100',
  '266,0 280,0 280,100 266,100',
  '0,0 26,0 153,100 127,100',
  '254,0 280,0 153,100 127,100',
];

const LetterGroup = ({ x, points }) => (
  <g transform={`translate(${x},0)`}>
    {points.map((pts) => (
      <motion.polygon key={pts} points={pts} variants={LETTER_BLOCK} />
    ))}
  </g>
);

const NhmLogo = () => (
  <motion.h1
    className="w-full overflow-hidden"
    variants={{
      initial: { scale: 1.03 },
      animate: {
        scale: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
      },
    }}
  >
    <svg
      viewBox="0 0 840 100"
      className="h-auto w-full fill-[#111]"
      aria-label="NHM"
    >
      <LetterGroup x={0} points={N_POLYS} />
      <LetterGroup x={280} points={H_POLYS} />
      <LetterGroup x={560} points={M_POLYS} />
    </svg>
  </motion.h1>
);

export default NhmLogo;
