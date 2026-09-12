import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  FADE_DURATION_S,
  FADE_UP,
  HERO_LEFT_STAGGER,
  HERO_RIGHT_STAGGER,
  ICON_PLUS,
  SCROLL_CUE_DELAY_S,
} from '../constants';
import { HERO_VIDEO } from '../content';
import ExploreButton from './ExploreButton';
import HeroHeader from './HeroHeader';

const HeroVideo = ({ src }) => (
  <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full">
    <video
      src={src}
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
);

const HeroIntro = () => (
  <motion.div
    className="mt-20 w-full max-w-[320px] px-10 sm:mt-28 md:mt-32 md:px-16"
    initial="initial"
    animate="animate"
    variants={HERO_LEFT_STAGGER}
  >
    <motion.div
      className="nm-mono mb-6 flex items-center gap-3 text-xs"
      variants={FADE_UP}
    >
      <span>01</span>
      <span className="h-[1.5px] w-16 bg-black/20" />
    </motion.div>
    <motion.h2
      className="text-[3.5rem] font-normal leading-[1] tracking-tight md:text-[5rem]"
      variants={FADE_UP}
    >
      TIMELESS
      <br />
      WONDERS
    </motion.h2>
    <motion.p
      className="mt-6 w-[240px] text-[13px] leading-[1.6] text-gray-700 md:text-[14px]"
      variants={FADE_UP}
    >
      Step into the natural world and
      <br />
      discover the stories written
      <br />
      millions of years ago.
    </motion.p>
    <motion.div variants={FADE_UP}>
      <ExploreButton />
    </motion.div>
  </motion.div>
);

const HeroSpecimen = () => (
  <motion.div
    className="mt-12 hidden w-[200px] flex-col pr-10 md:mt-20 md:flex md:pr-16"
    initial="initial"
    animate="animate"
    variants={HERO_RIGHT_STAGGER}
  >
    <motion.p
      className="nm-mono text-[10px] font-bold uppercase tracking-widest"
      variants={FADE_UP}
    >
      Tyrannosaurus Rex
    </motion.p>
    <motion.p className="mt-2 text-[12px] leading-[1.6] text-gray-600" variants={FADE_UP}>
      Late Cretaceous period
      <br />
      68-66 million years ago
    </motion.p>
    <motion.dl className="mt-6 space-y-3" variants={FADE_UP}>
      <div>
        <dt className="nm-mono text-[10px] uppercase tracking-widest text-gray-500">
          Length
        </dt>
        <dd className="text-[13px] font-medium">12.3 m</dd>
      </div>
      <div>
        <dt className="nm-mono text-[10px] uppercase tracking-widest text-gray-500">
          Height
        </dt>
        <dd className="text-[13px] font-medium">4.0 m</dd>
      </div>
    </motion.dl>
    <motion.a
      href="#collection"
      className="group mt-8 inline-flex items-center gap-3"
      variants={FADE_UP}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors duration-300 group-hover:border-black group-hover:bg-[#111] group-hover:text-white">
        <Plus size={ICON_PLUS} strokeWidth={1.5} />
      </span>
      <span className="nm-mono text-[10px] font-bold uppercase tracking-widest">
        View Details
      </span>
    </motion.a>
  </motion.div>
);

const ScrollCue = () => (
  <motion.div
    className="absolute bottom-10 left-[2.5rem] hidden items-center gap-4 md:left-[4rem] md:flex"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: FADE_DURATION_S, delay: SCROLL_CUE_DELAY_S, ease: 'easeOut' }}
  >
    <span className="flex h-12 w-12 items-center justify-center gap-[4px] rounded-full border border-gray-300">
      <span className="h-[12px] w-px bg-gray-600" />
      <span className="h-[12px] w-px bg-gray-600" />
    </span>
    <span className="nm-mono text-[10px] font-semibold uppercase tracking-widest text-gray-500">
      Scroll to explore
    </span>
  </motion.div>
);

const HeroSection = ({ showVideo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section
      id="visit"
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
    >
      {showVideo ? <HeroVideo src={HERO_VIDEO} /> : null}
      <HeroHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
      />
      <div className="relative z-10 flex w-full flex-1 flex-col justify-between pb-10 md:flex-row md:items-start md:justify-between">
        <HeroIntro />
        <HeroSpecimen />
      </div>
      <ScrollCue />
    </section>
  );
};

export default HeroSection;
