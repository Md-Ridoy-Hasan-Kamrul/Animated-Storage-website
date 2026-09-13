import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './vectrus.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK, NAV_FLIP_AT } from './constants';
import { useEmbedAutoplay } from './hooks/useEmbedAutoplay';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useNavEntrance } from './hooks/useNavEntrance';
import { usePageChrome } from './hooks/usePageChrome';
import { useVectrusFonts } from './hooks/useVectrusFonts';
import { useVideoScrub } from './hooks/useVideoScrub';
import { isNavLight, s1Opacity, s2Opacity, s3Opacity } from './utils/sectionOpacity';
import MobileOverlay from './components/MobileOverlay';
import Navbar from './components/Navbar';
import SectionOne from './components/SectionOne';
import SectionThree from './components/SectionThree';
import SectionTwo from './components/SectionTwo';
import VideoStage from './components/VideoStage';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isOpen, openMenu, closeMenu } = useMobileMenu();
  const entered = useNavEntrance();
  const { videoRef, canvasRef, containerRef, progress, canvasLive } = useVideoScrub();

  useVectrusFonts();
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
    <main ref={containerRef} className="vectrus relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <VideoStage videoRef={videoRef} canvasRef={canvasRef} canvasLive={canvasLive} />
        <div className="absolute inset-0 pointer-events-none">
          <Navbar isLight={isNavLight(progress, NAV_FLIP_AT)} entered={entered} onOpen={openMenu} />
          <SectionOne opacity={s1Opacity(progress)} />
          <SectionTwo opacity={s2Opacity(progress)} />
          <SectionThree opacity={s3Opacity(progress)} />
        </div>
      </div>

      <MobileOverlay isOpen={isOpen} onClose={closeMenu} />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-[#1D3045]/20 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#1D3045] backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm"
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
