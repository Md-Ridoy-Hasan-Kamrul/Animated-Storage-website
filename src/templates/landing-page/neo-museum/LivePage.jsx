import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './neo-museum.css';
import {
  BACK_ICON_SIZE,
  CHAPTER_CYCLE_MS,
  DETAIL_FALLBACK,
  EMBED_SCROLL_DELAY_MS,
  INITIAL_CHAPTER,
  STANDALONE_SCROLL_DELAY_MS,
  VIDEO_REVEAL_MS,
} from './constants';
import { CHAPTERS } from './content';
import { useChapterCycle } from './hooks/useChapterCycle';
import { useDelayedFlag } from './hooks/useDelayedFlag';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useNeoFonts } from './hooks/useNeoFonts';
import { usePageChrome } from './hooks/usePageChrome';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import HeroSection from './components/HeroSection';
import ExploreWorld from './components/ExploreWorld';
import AncientCollection from './components/AncientCollection';

/**
 * Neo Museum live page — orchestration only.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const showVideo = useDelayedFlag(VIDEO_REVEAL_MS, { immediate: isEmbed });
  const { activeChapter, selectChapter } = useChapterCycle(
    INITIAL_CHAPTER,
    CHAPTERS.length,
    CHAPTER_CYCLE_MS,
  );

  useNeoFonts();
  usePageChrome();
  useHumanAutoScroll({
    startDelayMs: isEmbed ? EMBED_SCROLL_DELAY_MS : STANDALONE_SCROLL_DELAY_MS,
  });

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div className="neo-museum min-h-screen bg-[#fcfcfc] text-[#111]">
      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-2 text-sm font-medium text-[#111] backdrop-blur-md transition-colors hover:border-black/25 hover:bg-white md:left-6 md:top-6"
          aria-label="Go back"
        >
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={2} />
          Back
        </button>
      ) : null}

      <HeroSection showVideo={showVideo} />
      <ExploreWorld />
      <AncientCollection
        chapters={CHAPTERS}
        activeChapter={activeChapter}
        onSelectChapter={selectChapter}
      />
    </div>
  );
};

export default LivePage;
