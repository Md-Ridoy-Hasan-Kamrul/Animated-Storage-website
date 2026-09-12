import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './adam-roberts.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK } from './constants';
import { useAdamFonts } from './hooks/useAdamFonts';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useMenuOpen } from './hooks/useMenuOpen';
import { usePageChrome } from './hooks/usePageChrome';
import BackgroundVideo from './components/BackgroundVideo';
import BottomBlock from './components/BottomBlock';
import MetaGrid from './components/MetaGrid';
import MobileMenu from './components/MobileMenu';
import Navbar from './components/Navbar';

/**
 * Adam Roberts / Grilled Pixels — locked viewport orchestration.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const { isOpen, openMenu, closeMenu } = useMenuOpen();

  useAdamFonts();
  usePageChrome();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div className="adam-roberts relative h-screen w-full overflow-hidden bg-black text-white">
      <BackgroundVideo />

      <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        <Navbar onOpenMenu={openMenu} />
        <MetaGrid />
        <div className="flex-1" />
        <BottomBlock />
      </div>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} />

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-4 left-4 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md transition-opacity hover:opacity-80"
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
