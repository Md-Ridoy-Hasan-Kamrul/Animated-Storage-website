import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './foldcraft.css';
import {
  BACK_ICON_SIZE,
  DETAIL_FALLBACK,
  EMBED_SCROLL_DELAY_MS,
  STANDALONE_SCROLL_DELAY_MS,
} from './constants';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useFoldcraftFonts } from './hooks/useFoldcraftFonts';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import { goToSection } from './utils/goToSection';
import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import HeroContent from './components/HeroContent';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isOpen, closeMenu, toggleMenu } = useMobileMenu();

  useFoldcraftFonts();
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

  const handleNavigate = useCallback(
    (href) => {
      goToSection(href, closeMenu);
    },
    [closeMenu],
  );

  const handleTalk = useCallback(() => {
    goToSection('#reach-us', closeMenu);
  }, [closeMenu]);

  const handleExplore = useCallback(() => {
    goToSection('#projects', closeMenu);
  }, [closeMenu]);

  return (
    <main className="foldcraft font-geist relative h-screen w-full overflow-hidden bg-black">
      <BackgroundVideo />
      <Navbar
        isOpen={isOpen}
        onToggle={toggleMenu}
        onNavigate={handleNavigate}
        onTalk={handleTalk}
      />
      <MobileMenu isOpen={isOpen} onNavigate={handleNavigate} onTalk={handleTalk} />
      <HeroContent onExplore={handleExplore} />

      <div id="projects" className="sr-only" />
      <div id="studio" className="sr-only" />
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
