import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './scaling-platform.css';
import { PAGE_CLASS } from './constants';
import AboutSection from './components/AboutSection';
import BackButton from './components/BackButton';
import HeroSection from './components/HeroSection';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useIsMobile } from './hooks/useIsMobile';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';
import { useQuanticoFont } from './hooks/useQuanticoFont';
import { useStandaloneBack } from './hooks/useStandaloneBack';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const isMobile = useIsMobile();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const handleBack = useStandaloneBack(navigate);

  useQuanticoFont();
  usePageChrome();

  useEffect(() => {
    if (!isMobile) closeMenu();
  }, [isMobile, closeMenu]);

  return (
    <div className={`${PAGE_CLASS}${isMobile ? ' is-mobile' : ''}`}>
      <HeroSection menuOpen={menuOpen} onToggle={toggleMenu} onNavigate={closeMenu} />
      <AboutSection />
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
