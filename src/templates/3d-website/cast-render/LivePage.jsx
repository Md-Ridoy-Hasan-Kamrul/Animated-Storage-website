import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './cast-render.css';
import {
  BACK_ICON_SIZE,
  DETAIL_FALLBACK,
  EMBED_SCROLL_DELAY_MS,
  STANDALONE_SCROLL_DELAY_MS,
} from './constants';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useCastFonts } from './hooks/useCastFonts';
import { useScrollScrub } from './hooks/useScrollScrub';
import { useClipPreload } from './hooks/useClipPreload';
import { useIosUnlock } from './hooks/useIosUnlock';
import BootScreen from './components/BootScreen';
import VideoStage from './components/VideoStage';
import ChromeHeader from './components/ChromeHeader';
import PanelStack from './components/PanelStack';
import SiteFooter from './components/SiteFooter';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const bootRef = useRef(null);
  const bootBarRef = useRef(null);
  const bootPctRef = useRef(null);
  const { clipRef, meterRef, panelRefs, booted, onDuration, onReady, scrollToHash } =
    useScrollScrub();

  useCastFonts();
  usePageChrome();
  useIosUnlock(clipRef);
  useClipPreload(clipRef, {
    onDuration,
    onReady,
    bootBarRef,
    bootPctRef,
  });
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
    <div className="cast-render">
      <BootScreen bootRef={bootRef} barRef={bootBarRef} pctRef={bootPctRef} done={booted} />
      <VideoStage clipRef={clipRef} />
      <i className="meter" id="meter" ref={meterRef} />
      <ChromeHeader onNavigate={scrollToHash} />
      <PanelStack panelRefs={panelRefs} onNavigate={scrollToHash} />
      <SiteFooter />
      <div className="track" />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f2f0ec]/80 px-3 py-1.5 text-xs font-medium text-[#0d0c0b] backdrop-blur-md min-[375px]:left-4 min-[375px]:top-4 min-[375px]:text-sm"
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
