import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';
import { usePortfolioChrome } from './hooks/usePortfolioChrome';
import { useEmbedMode } from './hooks/useEmbedMode';
import { PAGE_BG, DETAIL_FALLBACK } from './constants';

/**
 * Live 3D Portfolio 2.0 page — orchestration only.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();

  usePortfolioChrome();
  useHumanAutoScroll();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div
      className="jack-portfolio min-h-screen bg-[#0C0C0C] font-[Kanit,sans-serif] text-[#D7E2EA]"
      style={{ backgroundColor: PAGE_BG, overflowX: 'clip' }}
    >
      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3.5 py-2 text-sm font-medium text-[#D7E2EA] backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/85 hover:text-white md:left-6 md:top-6"
          aria-label="Go back"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back
        </button>
      ) : null}

      <HeroSection reserveBackSpace={isStandalone} compact={isEmbed} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default LivePage;
