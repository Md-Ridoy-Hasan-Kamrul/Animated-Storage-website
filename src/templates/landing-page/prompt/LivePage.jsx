import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './prompt.css';
import { GALLERY_IMAGES } from './content';
import { DETAIL_FALLBACK, PAGE_BG_WHITE } from './constants';
import { usePromptFont } from './hooks/usePromptFont';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useCustomCursor } from './hooks/useCustomCursor';
import { useVideoStage } from './hooks/useVideoStage';
import { useScrollArchive } from './hooks/useScrollArchive';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import CustomCursor from './components/CustomCursor';
import HeroChrome from './components/HeroChrome';
import VideoStage from './components/VideoStage';
import BlackPanel from './components/BlackPanel';
import OutroLayer from './components/OutroLayer';

/**
 * Prompt archive landing — orchestration only.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();

  usePromptFont();
  useHumanAutoScroll();

  const cursorRef = useCustomCursor(isStandalone && !isEmbed);
  const { leftRef, rightRef, ready, VIDEO_LEFT, VIDEO_RIGHT } = useVideoStage();
  const {
    layout,
    wrapRef,
    panelRef,
    gridRef,
    overlayRef,
    footerRef,
    buyRef,
    infoRef,
    symbolRef,
    spacerRef,
  } = useScrollArchive({ imageCount: GALLERY_IMAGES.length });

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className={`prompt-archive relative bg-white ${isStandalone ? 'cursor-none' : ''}`}
      style={{
        backgroundColor: PAGE_BG_WHITE,
        userSelect: 'none',
        minHeight: '500vh',
      }}
    >
      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[60] inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/20 bg-white/80 px-3.5 py-2 text-sm font-medium text-black backdrop-blur-md mix-blend-normal"
          aria-label="Go back"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back
        </button>
      ) : null}

      <CustomCursor cursorRef={cursorRef} hidden={isEmbed || !isStandalone} />
      <VideoStage
        leftRef={leftRef}
        rightRef={rightRef}
        leftSrc={VIDEO_LEFT}
        rightSrc={VIDEO_RIGHT}
        ready={ready}
      />
      <HeroChrome infoRef={infoRef} buyRef={buyRef} symbolRef={symbolRef} />
      <BlackPanel
        panelRef={panelRef}
        wrapRef={wrapRef}
        gridRef={gridRef}
        layout={layout}
      />
      <OutroLayer overlayRef={overlayRef} footerRef={footerRef} />
    </div>
  );
};

export default LivePage;
