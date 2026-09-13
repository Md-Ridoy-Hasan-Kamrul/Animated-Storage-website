import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './nova.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK, PAGE_CLASS } from './constants';
import Navbar from './components/Navbar';
import ScrollVideo from './components/ScrollVideo';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import { useEmbedAutoplay } from './hooks/useEmbedAutoplay';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useNovaFonts } from './hooks/useNovaFonts';
import { usePageChrome } from './hooks/usePageChrome';
import { useScrollScrub } from './hooks/useScrollScrub';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { videoRef, canvasRef, hasVideoFrame, cacheReady } = useScrollScrub();

  useNovaFonts();
  usePageChrome();
  useEmbedAutoplay(isEmbed);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div className={`${PAGE_CLASS} relative min-h-screen antialiased`}>
      <ScrollVideo
        videoRef={videoRef}
        canvasRef={canvasRef}
        hasVideoFrame={hasVideoFrame}
        cacheReady={cacheReady}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          <div className="h-[80vh]" aria-hidden="true" data-nova-spacer />
          <SectionTwo />
        </main>
      </div>

      <div id="about" className="sr-only" />
      <div id="blog" className="sr-only" />
      <div id="contact" className="sr-only" />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm"
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
