import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './lumina.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK, EMBED_SCROLL_DELAY_MS } from './constants';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import BackgroundVideo from './components/BackgroundVideo';
import LiquidFooter from './components/LiquidFooter';
import UpperCta from './components/UpperCta';

/**
 * Lumina section — video stage + liquid-glass footer.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();

  usePageChrome();
  useHumanAutoScroll({ startDelayMs: isEmbed ? EMBED_SCROLL_DELAY_MS : 700 });

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <main className="lumina relative flex min-h-[115vh] w-full flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">
      <BackgroundVideo />

      <div className="relative z-10 flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 sm:px-6 lg:px-8">
        <UpperCta />
        <div className="flex-1" />
        <LiquidFooter />
      </div>

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-opacity hover:opacity-80"
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
