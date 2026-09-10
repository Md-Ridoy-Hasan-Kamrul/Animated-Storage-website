import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import { useHumanAutoScroll } from '../../../hooks/useHumanAutoScroll';

const PAGE_BG = '#0C0C0C';
const DETAIL_FALLBACK = '/templates/3d-portfolio';

const LivePage = () => {
  const navigate = useNavigate();
  const [isStandalone, setIsStandalone] = useState(false);
  const [isEmbed, setIsEmbed] = useState(
    () =>
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('embed') === '1',
  );

  useHumanAutoScroll();

  useEffect(() => {
    const embed = new URLSearchParams(window.location.search).get('embed') === '1';
    setIsEmbed(embed);
    setIsStandalone(window.self === window.top && !embed);
  }, []);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  useEffect(() => {
    const prev = {
      title: document.title,
      htmlBg: document.documentElement.style.backgroundColor,
      bodyBg: document.body.style.backgroundColor,
      bodyFont: document.body.style.fontFamily,
      bodyMargin: document.body.style.margin,
      bodyPadding: document.body.style.padding,
    };

    document.title = 'Kamrul -- 3D Creator';
    document.documentElement.style.backgroundColor = PAGE_BG;
    document.body.style.backgroundColor = PAGE_BG;
    document.body.style.fontFamily = "'Kanit', sans-serif";
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const root = document.getElementById('root');
    const prevRootBg = root?.style.backgroundColor;
    if (root) root.style.backgroundColor = PAGE_BG;

    return () => {
      document.title = prev.title || 'Kmotion';
      document.documentElement.style.backgroundColor = prev.htmlBg;
      document.body.style.backgroundColor = prev.bodyBg;
      document.body.style.fontFamily = prev.bodyFont;
      document.body.style.margin = prev.bodyMargin;
      document.body.style.padding = prev.bodyPadding;
      if (root) root.style.backgroundColor = prevRootBg || '';
    };
  }, []);

  return (
    <div
      className="jack-portfolio min-h-screen bg-[#0C0C0C] font-[Kanit,sans-serif] text-[#D7E2EA]"
      style={{ backgroundColor: PAGE_BG }}
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
