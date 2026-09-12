import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './heritage-grove.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK, EMBED_SCROLL_DELAY_MS } from './constants';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useGroveFonts } from './hooks/useGroveFonts';
import { usePageChrome } from './hooks/usePageChrome';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import SiteFooter from './components/SiteFooter';

/**
 * Heritage Grove footer — orchestration only.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();

  useGroveFonts();
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
    <div className="heritage-grove">
      <SiteFooter />
      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[70] inline-flex items-center gap-2 rounded-full border border-[#175A67]/20 bg-[#EAE3DE]/80 px-3.5 py-2 text-sm font-medium text-[#175A67] backdrop-blur-md transition-opacity hover:opacity-80"
          aria-label="Go back"
        >
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={2} />
          Back
        </button>
      ) : null}
    </div>
  );
};

export default LivePage;
