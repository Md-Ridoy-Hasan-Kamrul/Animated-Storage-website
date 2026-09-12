import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './velorah.css';
import {
  BACK_ICON_SIZE,
  DETAIL_FALLBACK,
  EMBED_SCROLL_DELAY_MS,
  STANDALONE_SCROLL_DELAY_MS,
} from './constants';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useVelorahFonts } from './hooks/useVelorahFonts';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import { scrollToJourney } from './utils/scrollToJourney';
import BackgroundVideo from './components/BackgroundVideo';
import NavBar from './components/NavBar';
import HeroCopy from './components/HeroCopy';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();

  useVelorahFonts();
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

  const handleBeginJourney = useCallback(() => {
    scrollToJourney();
  }, []);

  return (
    <main className="velorah relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <BackgroundVideo />

      <NavBar isStandalone={isStandalone} onBeginJourney={handleBeginJourney} />
      <HeroCopy onBeginJourney={handleBeginJourney} />
      <div id="studio" className="sr-only" />
      <div id="about" className="sr-only" />
      <div id="journal" className="sr-only" />
      <div id="reach-us" className="sr-only" />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-opacity hover:opacity-80 min-[375px]:left-4 min-[375px]:top-4 min-[375px]:px-3.5 min-[375px]:py-2 min-[375px]:text-sm md:left-6 md:top-6"
          aria-label="Go back"
        >
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={2} />
          Back
        </button>
      ) : null}
    </main>
  );
};

export default LivePage;
