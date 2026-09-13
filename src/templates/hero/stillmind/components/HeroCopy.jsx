import React, { memo } from 'react';
import { BADGE_LABEL, DARK_SHIFT_MS, HEADING_LINE_ONE, HEADING_LINE_TWO, SUBTEXT } from '../constants';
import EmailCapture from './EmailCapture';
import VideoSwitcher from './VideoSwitcher';

const HeroCopy = memo(({ isDark, activeVideo, onSelectVideo }) => {
  const inkClass = isDark ? 'stillmind-woods-ink' : 'text-white';
  const durationClass = 'stillmind-ink-shift';
  const durationStyle = { transitionDuration: `${DARK_SHIFT_MS}ms` };

  return (
    <div
      className="relative z-[2] mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6"
      style={durationStyle}
    >
      <p
        className={`liquid-glass rounded-full px-4 py-2 text-[11px] sm:px-5 sm:text-xs ${inkClass} ${durationClass}`}
        style={{ fontFamily: 'system-ui, sans-serif', ...durationStyle }}
      >
        {BADGE_LABEL}
      </p>
      <h1
        className={`mt-5 max-w-4xl text-4xl leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] ${inkClass} ${durationClass}`}
        style={durationStyle}
      >
        {HEADING_LINE_ONE}
        <br />
        {HEADING_LINE_TWO}
      </h1>
      <p
        className={`mt-5 max-w-xl text-sm leading-relaxed sm:text-base ${inkClass} ${durationClass}`}
        style={{ fontFamily: 'system-ui, sans-serif', ...durationStyle }}
      >
        {SUBTEXT}
      </p>
      <EmailCapture inkClass={`${inkClass} ${durationClass}`} durationClass="" />
      <VideoSwitcher
        activeVideo={activeVideo}
        onSelect={onSelectVideo}
        inkClass={inkClass}
        durationClass={durationClass}
      />
    </div>
  );
});

HeroCopy.displayName = 'HeroCopy';

export default HeroCopy;
