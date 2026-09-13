import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './stillmind.css';
import { BACK_ICON_SIZE, DEEP_WOODS_INDEX, DETAIL_FALLBACK } from './constants';
import { useActiveVideo } from './hooks/useActiveVideo';
import { useEmbedCycle } from './hooks/useEmbedCycle';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';
import { useStillmindFonts } from './hooks/useStillmindFonts';
import { useVideoPlayback } from './hooks/useVideoPlayback';
import { isDeepWoods } from './utils/videoSwitch';
import BottomStats from './components/BottomStats';
import HeroCopy from './components/HeroCopy';
import MobileOverlay from './components/MobileOverlay';
import Navbar from './components/Navbar';
import PngOverlay from './components/PngOverlay';
import VideoLayers from './components/VideoLayers';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isOpen, closeMenu, toggleMenu } = useMobileMenu();
  const { activeVideo, isTransitioning, selectVideo } = useActiveVideo();
  const { setVideoRef } = useVideoPlayback();

  useStillmindFonts();
  usePageChrome();
  useEmbedCycle(isEmbed, selectVideo, activeVideo, isTransitioning);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  const handleNavigate = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const handleCta = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <section className="stillmind relative h-screen w-full overflow-hidden bg-black">
      <VideoLayers activeVideo={activeVideo} setVideoRef={setVideoRef} />
      <PngOverlay />

      <div className="relative z-[2] flex h-full flex-col">
        <Navbar
          isOpen={isOpen}
          onToggle={toggleMenu}
          onNavigate={handleNavigate}
          onCta={handleCta}
        />
        <div className="flex flex-1 flex-col items-center justify-center">
          <HeroCopy
            isDark={isDeepWoods(activeVideo, DEEP_WOODS_INDEX)}
            activeVideo={activeVideo}
            onSelectVideo={selectVideo}
          />
        </div>
        <BottomStats />
      </div>

      <MobileOverlay isOpen={isOpen} onNavigate={handleNavigate} onCta={handleCta} />

      <div id="hero" className="sr-only" />
      <div id="how-it-works" className="sr-only" />
      <div id="features" className="sr-only" />
      <div id="pricing" className="sr-only" />
      <div id="community" className="sr-only" />

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
    </section>
  );
};

export default LivePage;
