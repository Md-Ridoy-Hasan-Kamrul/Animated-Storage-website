import React from 'react';
import { motion } from 'framer-motion';
import { CAPTION_TEXT } from '../content';
import {
  MOTION_EASE,
  OUTRO_OFFSET_DESKTOP,
  OUTRO_OFFSET_MOBILE,
} from '../constants';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: MOTION_EASE, delay },
});

/** prmpt® wordmark — italic display + circled R (matches design frame). */
const LogoMark = () => (
  <svg viewBox="0 0 355 110" className="h-auto w-full" aria-label="prmpt">
    <text
      x="0"
      y="82"
      fill="#fff"
      style={{
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: 92,
        fontStyle: 'italic',
        letterSpacing: '-0.04em',
      }}
    >
      prmpt
    </text>
    <circle cx="318" cy="30" r="18" fill="none" stroke="#fff" strokeWidth="2.5" />
    <text
      x="318"
      y="37"
      textAnchor="middle"
      fill="#fff"
      style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 20 }}
    >
      ®
    </text>
  </svg>
);

const HeroChrome = ({ infoRef, buyRef, symbolRef }) => (
  <>
    <motion.div
      className="pointer-events-none fixed left-4 top-4 z-20 w-[124px] mix-blend-exclusion sm:left-8 sm:top-8 sm:w-[266px] lg:w-[355px]"
      {...fadeUp(0)}
    >
      <LogoMark />
    </motion.div>

    <motion.p
      className="pointer-events-none fixed left-4 z-20 w-[calc(100vw-32px)] text-[12px] leading-[140%] tracking-[-0.04em] text-white mix-blend-exclusion sm:left-8 sm:top-[180px] sm:w-[calc(50vw-48px)] lg:top-[244px] lg:w-[692px]"
      style={{ top: 118 }}
      {...fadeUp(0.3)}
    >
      {CAPTION_TEXT}
    </motion.p>

    <motion.header
      className="pointer-events-none fixed right-4 top-4 z-20 flex h-[30px] w-auto items-center justify-between mix-blend-exclusion sm:right-8 sm:top-8 lg:w-[330px]"
      {...fadeUp(0.15)}
    >
      <span className="hidden text-[15px] uppercase tracking-[-0.04em] text-white lg:inline">
        ABOUT
      </span>
      <div className="ml-auto flex items-center gap-5 lg:gap-[50px]">
        <svg
          viewBox="0 0 40 40"
          className="h-6 w-6 lg:h-[30px] lg:w-[30px]"
          aria-hidden
        >
          <path d="M0 14H40" stroke="#fff" strokeWidth="2.5" />
          <path d="M0 26H40" stroke="#fff" strokeWidth="2.5" />
        </svg>
        <span className="text-[13px] text-white lg:text-[15px]">[ CART ]</span>
      </div>
    </motion.header>

    <motion.div
      id="outro-info"
      ref={infoRef}
      data-outro-offset-desktop={OUTRO_OFFSET_DESKTOP}
      data-outro-offset-mobile={OUTRO_OFFSET_MOBILE}
      className="pointer-events-none fixed bottom-12 left-0 right-0 z-20 flex flex-col items-center mix-blend-exclusion lg:bottom-20 lg:left-auto lg:right-8 lg:w-[330px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: MOTION_EASE, delay: 0.45 }}
    >
      <div className="mb-3 flex w-[252px] flex-col items-start lg:mb-8 lg:w-full">
        <div className="relative mb-2 h-5 w-5 lg:h-[30px] lg:w-[30px]">
          <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
            <circle
              cx="20"
              cy="20"
              r="18.75"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            />
          </svg>
          <span
            id="circle-symbol"
            ref={symbolRef}
            className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[-0.04em] text-white lg:text-[15px]"
          >
            8
          </span>
        </div>
        <p className="w-full text-center text-[20px] uppercase leading-none tracking-[-0.04em] text-white lg:text-[30px]">
          ARCHIVE COLLECTION
          <br />
          &quot;PROMPT&quot;
        </p>
      </div>
      <p className="text-center text-[60px] leading-none tracking-[-0.04em] text-white lg:text-[80px]">
        $97,33
      </p>
    </motion.div>

    <div
      id="outro-buy"
      ref={buyRef}
      className="pointer-events-none fixed bottom-[60px] left-4 right-4 z-20 flex h-[100px] origin-bottom-right items-center justify-center rounded-full bg-white mix-blend-exclusion lg:bottom-8 lg:left-auto lg:right-8 lg:h-[174px] lg:w-[330px]"
      style={{ transform: 'scale(0)', borderRadius: 1335 }}
    >
      <span className="text-[72px] tracking-[-0.04em] text-white mix-blend-exclusion lg:text-[110px]">
        view
      </span>
    </div>
  </>
);

export default HeroChrome;
