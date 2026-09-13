import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './mainframe.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK } from './constants';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useEmbedScrub } from './hooks/useEmbedScrub';
import { useMainframeFonts } from './hooks/useMainframeFonts';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useMouseScrub } from './hooks/useMouseScrub';
import { usePageChrome } from './hooks/usePageChrome';
import HeroCopy from './components/HeroCopy';
import MobileOverlay from './components/MobileOverlay';
import Navbar from './components/Navbar';
import SectionAnchors from './components/SectionAnchors';
import VideoBackground from './components/VideoBackground';

const LivePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  useMainframeFonts();
  usePageChrome();
  useMouseScrub(videoRef, { enabled: !isEmbed });
  useEmbedScrub(videoRef, isEmbed);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <main className="mainframe relative h-screen w-full overflow-hidden">
      <VideoBackground videoRef={videoRef} />
      <Navbar isOpen={isOpen} onToggle={toggleMenu} onNavigate={closeMenu} />
      <MobileOverlay isOpen={isOpen} onNavigate={closeMenu} />
      <HeroCopy />
      <SectionAnchors />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:top-4 min-[375px]:text-sm"
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
