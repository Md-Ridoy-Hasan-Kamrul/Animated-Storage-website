import React, { memo } from 'react';
import { INTRO_LINE_ONE, INTRO_LINE_TWO, TYPEWRITER_TEXT } from '../constants';
import { usePillsReveal } from '../hooks/usePillsReveal';
import { useTypewriter } from '../hooks/useTypewriter';
import ActionPills from './ActionPills';

const HeroCopy = memo(() => {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const pillsVisible = usePillsReveal();

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <p className="mainframe-intro pointer-events-none mb-5 select-none sm:mb-6">
          {INTRO_LINE_ONE}
          <br />
          {INTRO_LINE_TWO}
        </p>
        <p className="mainframe-type mb-5 sm:mb-6">
          {displayed}
          {done ? null : <span className="mainframe-cursor" aria-hidden="true" />}
        </p>
        <ActionPills visible={pillsVisible} />
      </div>
    </section>
  );
});

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
