import React from 'react';
import { motion } from 'framer-motion';
import {
  ACTION_PILLS,
  FADE_UP,
  HEADING_REVEAL,
  ICON_PILL,
  PILL_STAGGER,
  VIEW_MARGIN_HEADING,
} from '../constants';
import { PILL_ICONS } from '../icons';

const ActionPill = ({ icon, label }) => {
  const Icon = PILL_ICONS[icon];
  return (
    <motion.a
      href="#collection"
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/50 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-gray-800 backdrop-blur-sm transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
      variants={FADE_UP}
    >
      <Icon size={ICON_PILL} strokeWidth={2} />
      {label}
    </motion.a>
  );
};

const ExploreWorld = () => (
  <section
    id="explore"
    className="relative z-20 flex min-h-[75vh] w-full flex-col items-center bg-[#fcfcfc] pb-0 pt-24 md:min-h-screen md:pt-32"
  >
    <p className="nm-mono mb-12 text-[10px] tracking-[0.2em] md:text-[11px]">
      <span className="text-gray-500">[ 02 ]</span>{' '}
      <span className="font-bold uppercase text-gray-900">Explore Our World</span>
    </p>

    <motion.h2
      className="max-w-[1000px] px-6 text-center text-[2.2rem] font-medium leading-[1.1] tracking-tight text-[#111] md:text-[3.5rem] lg:text-[4.2rem]"
      initial={HEADING_REVEAL.initial}
      whileInView={HEADING_REVEAL.visible}
      viewport={{ once: true, margin: VIEW_MARGIN_HEADING }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      Unearth the stories of our planet&apos;s past
      <span className="hidden md:inline">
        <br />
      </span>{' '}
      through fossils, minerals, and ancient wonders.
    </motion.h2>

    <motion.div
      className="mt-10 mb-10 flex flex-wrap justify-center gap-3 px-6 md:mb-24 md:mt-14 md:gap-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={PILL_STAGGER}
    >
      {ACTION_PILLS.map((pill) => (
        <ActionPill key={pill.id} icon={pill.icon} label={pill.label} />
      ))}
    </motion.div>

    <div className="min-h-[220px] w-full md:min-h-[450px]" aria-hidden />

    <div className="pointer-events-none absolute bottom-0 hidden w-full justify-between px-8 pb-8 md:flex md:px-16 md:pb-12">
      <span className="nm-mono text-[10px] font-medium uppercase tracking-widest text-gray-500">
        WE DON&apos;T JUST TELL STORIES.
      </span>
      <span className="nm-mono text-[10px] font-medium uppercase tracking-widest text-gray-500">
        PALEONTOLOGY (C) 2026
      </span>
    </div>
  </section>
);

export default ExploreWorld;
