import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  COUNTER_DURATION_S,
  COUNTER_SLIDE_PX,
  FADE_UP,
  ICON_CHAPTER,
  ICON_CIRCLE,
  PTERO_DURATION_S,
  PTERO_ENTER_Y,
  PTERO_REST_Y,
  VALUE_PILLS,
  VIEW_MARGIN_PTERO,
} from '../constants';
import { PTERODACTYL_IMAGE } from '../content';
import { CIRCLE_ICONS } from '../icons';
import { formatChapterCounter, formatChapterTotal } from '../utils/chapterCycle';
import SandTransitionImage from './SandTransitionImage';

const PterodactylOverlap = () => (
  <motion.img
    src={PTERODACTYL_IMAGE}
    alt=""
    className="pointer-events-none absolute left-1/2 top-0 z-0 w-[160vw] max-w-none md:w-[1100px]"
    initial={{ x: '-50%', y: PTERO_ENTER_Y, opacity: 0 }}
    whileInView={{ x: '-50%', y: PTERO_REST_Y, opacity: 1 }}
    viewport={{ once: true, margin: VIEW_MARGIN_PTERO }}
    transition={{ duration: PTERO_DURATION_S, ease: 'easeOut' }}
  />
);

const HeadingCircles = () => (
  <span className="mx-2 inline-flex translate-y-[-4px] items-center gap-2 align-middle md:mx-4 md:gap-3">
    {CIRCLE_ICONS.map((Icon, index) => (
      <span
        key={Icon.displayName || index}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-black text-gray-400 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:h-14 md:w-14"
      >
        <Icon size={ICON_CIRCLE} />
      </span>
    ))}
  </span>
);

const ChapterCounter = ({ activeChapter, total }) => (
  <div className="nm-mono flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#888]">
    <span className="relative inline-block h-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeChapter}
          className="inline-block"
          initial={{ y: COUNTER_SLIDE_PX, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -COUNTER_SLIDE_PX, opacity: 0 }}
          transition={{ duration: COUNTER_DURATION_S }}
        >
          {formatChapterCounter(activeChapter)}
        </motion.span>
      </AnimatePresence>
    </span>
    <span className="text-[#333]">/</span>
    <span>{formatChapterTotal(total)}</span>
  </div>
);

const ChapterList = ({ chapters, activeChapter, onSelect }) => (
  <ul>
    {chapters.map((chapter, index) => {
      const isActive = index === activeChapter;
      return (
        <li key={chapter.name} className="border-b border-gray-800/80">
          <button
            type="button"
            onClick={() => onSelect(index)}
            className={`flex w-full items-center justify-between py-8 text-left transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-[#444] hover:text-[#999]'
            }`}
          >
            <span className="text-2xl font-medium tracking-tight md:text-[2rem]">
              {chapter.name}
            </span>
            <AnimatePresence>
              {isActive ? (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                >
                  <ArrowUpRight
                    size={ICON_CHAPTER}
                    strokeWidth={1}
                    className="text-gray-400"
                  />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        </li>
      );
    })}
  </ul>
);

const AncientCollection = ({ chapters, activeChapter, onSelectChapter }) => {
  const chapter = chapters[activeChapter];

  return (
    <section
      id="collection"
      className="relative z-30 flex w-full flex-col bg-[#0a0a0a] text-white"
    >
      <PterodactylOverlap />

      <div className="relative z-10 mb-16 flex flex-col justify-between px-8 pt-32 md:px-16 md:pt-48 xl:flex-row">
        <h2 className="max-w-4xl text-[1.8rem] font-medium leading-[1.15] tracking-tight text-white md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem]">
          Curated from millions of years of wonder
          <HeadingCircles />
          &amp; discovery.
        </h2>
        <div className="mt-10 xl:mt-2 xl:max-w-xs">
          <p className="nm-mono mb-6 text-[9px] uppercase leading-relaxed tracking-widest text-gray-400 md:text-[10px]">
            WE DON&apos;T JUST DISPLAY FOSSILS
            <br />
            WE SHARE EARTH&apos;S STORY
          </p>
          <div className="flex flex-wrap gap-2">
            {VALUE_PILLS.map((label) => (
              <span
                key={label}
                className="rounded-full border border-gray-600 px-5 py-2 text-[9px] font-mono uppercase tracking-widest text-gray-300 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 h-px bg-gray-800" />

      <div className="relative z-10 flex flex-col md:flex-row">
        <div className="relative flex min-h-[400px] w-full flex-col justify-between border-b border-gray-800 p-8 md:min-h-[500px] md:w-[35%] md:border-b-0 md:border-r">
          <p className="text-xl tracking-[0.3em] text-gray-500">***</p>
          <div className="relative min-h-[240px] flex-1">
            <AnimatePresence mode="wait">
              <SandTransitionImage
                key={chapter.image}
                src={chapter.image}
                alt={chapter.name}
                className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-lighten"
              />
            </AnimatePresence>
          </div>
          <ChapterCounter activeChapter={activeChapter} total={chapters.length} />
        </div>

        <div className="w-full md:w-[65%]">
          <div className="nm-mono flex items-center justify-between border-b border-gray-800 p-8 text-[10px] tracking-widest text-gray-400">
            <span>Explore the past. Understand the present.</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeChapter}
                initial={FADE_UP.initial}
                animate={FADE_UP.animate}
                exit={{ opacity: 0, y: -8 }}
              >
                Chapter {formatChapterCounter(activeChapter)}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="px-8">
            <ChapterList
              chapters={chapters}
              activeChapter={activeChapter}
              onSelect={onSelectChapter}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-800" />
      <p className="nm-mono bg-[#0a0a0a] px-8 py-8 text-[10px] uppercase tracking-widest text-gray-500">
        DIGGING INTO OUR PLANET&apos;S PAST
      </p>
    </section>
  );
};

export default AncientCollection;
