import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './portfolio-cosmic.css';
import { DETAIL_FALLBACK } from './constants';
import { useCosmicFonts } from './hooks/useCosmicFonts';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import SelectedWorks from './components/SelectedWorks';
import JournalSection from './components/JournalSection';
import ExplorationsSection from './components/ExplorationsSection';
import StatsSection from './components/StatsSection';
import ContactFooter from './components/ContactFooter';

/**
 * Portfolio Cosmic live page — orchestration only.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const [isLoading, setIsLoading] = useState(!isEmbed);

  useCosmicFonts();
  usePageChrome();
  useHumanAutoScroll();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="portfolio-cosmic relative min-h-screen">
      {isLoading ? <LoadingScreen onComplete={handleLoadingComplete} /> : null}

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3.5 py-2 text-sm font-medium text-[hsl(var(--text))] backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/85 md:left-6 md:top-6"
          aria-label="Go back"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back
        </button>
      ) : null}

      <HeroSection animate={!isLoading} />
      <SelectedWorks />
      <JournalSection />
      <ExplorationsSection enabled={!isEmbed} />
      <StatsSection />
      <ContactFooter animate={!isEmbed} />
    </div>
  );
};

export default LivePage;
