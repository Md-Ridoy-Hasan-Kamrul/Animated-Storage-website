import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './nike.css';
import {
  BACK_ICON_SIZE,
  BASE_RADIUS_DESKTOP,
  BASE_RADIUS_MOBILE,
  DETAIL_FALLBACK,
  PAGE_CLASS,
  SECTION_SHADOW,
} from './constants';
import { OVERLAY_IMAGE_LOCAL, REVEAL_VIDEO } from './content';
import HeroHeadline from './components/HeroHeadline';
import HoverZones from './components/HoverZones';
import NikeCta from './components/NikeCta';
import SpotlightReveal from './components/SpotlightReveal';
import StatsCard from './components/StatsCard';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useNikeFonts } from './hooks/useNikeFonts';
import { usePageChrome } from './hooks/usePageChrome';
import { useVideoPlaying } from './hooks/useVideoPlaying';
import { useViewport } from './hooks/useViewport';
import { resolveBaseRadius } from './utils/trailMath';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { isMobile, isTablet } = useViewport();
  const { isSecondVideoPlaying, setPlaying } = useVideoPlaying(isMobile, isEmbed);
  const baseRadius = resolveBaseRadius(isMobile, BASE_RADIUS_MOBILE, BASE_RADIUS_DESKTOP);

  useNikeFonts();
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
    <div className={`${PAGE_CLASS} min-h-[100dvh] bg-black text-white`}>
      <section
        className="relative z-10 h-[100dvh] w-full overflow-hidden bg-black text-white"
        style={{ boxShadow: SECTION_SHADOW }}
      >
        <SpotlightReveal
          imageSrc={OVERLAY_IMAGE_LOCAL}
          videoSrc={REVEAL_VIDEO}
          isPlaying={isSecondVideoPlaying}
          baseRadius={baseRadius}
          tourCursor={isEmbed}
        />
        <HoverZones isMobile={isMobile} onPlay={setPlaying} />
        <StatsCard isMobile={isMobile} isTablet={isTablet} />
        <HeroHeadline isMobile={isMobile} isTablet={isTablet} />
        <NikeCta isMobile={isMobile} isTablet={isTablet} />
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
