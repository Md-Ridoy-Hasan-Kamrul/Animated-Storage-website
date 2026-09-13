import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mind-body-healing.css';
import { PAGE_CLASS } from './constants';
import BackButton from './components/BackButton';
import HeroMain from './components/HeroMain';
import HeroVideo from './components/HeroVideo';
import MobileMenu from './components/MobileMenu';
import Navbar from './components/Navbar';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useInterFonts } from './hooks/useInterFonts';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const handleBack = useStandaloneBack(navigate);

  useInterFonts();
  usePageChrome();

  return (
    <section className={PAGE_CLASS}>
      <HeroVideo />
      <Navbar menuOpen={menuOpen} onToggle={toggleMenu} />
      <MobileMenu menuOpen={menuOpen} onNavigate={closeMenu} />
      <HeroMain menuOpen={menuOpen} />
      <div id="home" className="sr-only" />
      <div id="approach" className="sr-only" />
      <div id="methods" className="sr-only" />
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </section>
  );
};

export default LivePage;
