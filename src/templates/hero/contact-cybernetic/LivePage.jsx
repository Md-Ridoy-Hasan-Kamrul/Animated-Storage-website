import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './contact-cybernetic.css';
import {
  BACK_ICON_SIZE,
  BACK_ICON_STROKE,
  DETAIL_FALLBACK,
  HISTORY_CAN_GO_BACK_MIN,
  PAGE_CLASS,
} from './constants';
import Headline from './components/Headline';
import HeroVideo from './components/HeroVideo';
import MobileOverlay from './components/MobileOverlay';
import Navbar from './components/Navbar';
import ServicePills from './components/ServicePills';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useInterFonts } from './hooks/useInterFonts';
import { useIsDesktop } from './hooks/useIsDesktop';
import { useMobileAutoplay } from './hooks/useMobileAutoplay';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useMouseScrub } from './hooks/useMouseScrub';
import { usePageChrome } from './hooks/usePageChrome';

const LivePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { isStandalone } = useEmbedMode();
  const isDesktop = useIsDesktop();
  const { isMobileMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  useInterFonts();
  usePageChrome();
  useMouseScrub(videoRef, { enabled: isDesktop });
  useMobileAutoplay(videoRef, { enabled: !isDesktop });

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > HISTORY_CAN_GO_BACK_MIN) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div className={PAGE_CLASS}>
      <Navbar isMobileMenuOpen={isMobileMenuOpen} onToggle={toggleMenu} />
      <MobileOverlay isMobileMenuOpen={isMobileMenuOpen} onNavigate={closeMenu} />
      <HeroVideo videoRef={videoRef} />

      <div className="cc-copy relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 pt-24 flex-1 flex flex-col justify-center"
        >
          <div className="cc-copy-col max-w-[540px] xl:max-w-[580px]">
            <Headline />
            <ServicePills />
          </div>
        </main>
      </div>

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-3 bottom-3 z-[70] inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/85 px-3 py-1.5 text-xs font-medium text-black"
          aria-label="Go back"
        >
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={BACK_ICON_STROKE} />
          Back
        </button>
      ) : null}
    </div>
  );
};

export default LivePage;
