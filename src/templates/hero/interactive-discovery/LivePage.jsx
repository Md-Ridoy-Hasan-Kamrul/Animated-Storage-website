import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './lithos.css';
import {
  BACK_ICON_SIZE,
  DETAIL_FALLBACK,
  PAGE_CLASS,
  ROOT_FONT,
  SECTION_HEIGHT,
} from './constants';
import { BG_IMAGE_1, BG_IMAGE_2 } from './content';
import HeroCopy from './components/HeroCopy';
import HeroHeading from './components/HeroHeading';
import Navbar from './components/Navbar';
import RevealLayer from './components/RevealLayer';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useEmbedSpotlight } from './hooks/useEmbedSpotlight';
import { useLithosFonts } from './hooks/useLithosFonts';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';
import { useSmoothCursor } from './hooks/useSmoothCursor';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isOpen, closeMenu, toggleMenu } = useMobileMenu();
  const { smoothRef, setRaw } = useSmoothCursor({ followPointer: !isEmbed });

  useLithosFonts();
  usePageChrome();
  useEmbedSpotlight(isEmbed, setRaw);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div className={`${PAGE_CLASS} min-h-screen bg-white tracking-[-0.02em]`} style={{ fontFamily: ROOT_FONT }}>
      <Navbar isOpen={isOpen} onToggle={toggleMenu} onNavigate={closeMenu} />

      <section
        className="relative h-screen w-full overflow-hidden bg-black"
        style={{ height: SECTION_HEIGHT }}
        data-lithos-height={SECTION_HEIGHT}
      >
        <div
          className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          aria-hidden="true"
        />
        <RevealLayer image={BG_IMAGE_2} smoothRef={smoothRef} />
        <HeroHeading />
        <HeroCopy />
      </section>

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-4 left-3 z-[110] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm"
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
