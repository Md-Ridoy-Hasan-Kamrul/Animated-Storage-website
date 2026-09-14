import React from 'react';
import { useNavigate } from 'react-router-dom';
import './equilibrium.css';
import { PAGE_CLASS } from './constants';
import BackButton from './components/BackButton';
import HeroCopy from './components/HeroCopy';
import HeroVideo from './components/HeroVideo';
import MobileMenu from './components/MobileMenu';
import Navbar from './components/Navbar';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useGeistFont } from './hooks/useGeistFont';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const { menuOpen, toggleMenu } = useMobileMenu();
  const handleBack = useStandaloneBack(navigate);

  useGeistFont();
  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <HeroVideo />
      <Navbar menuOpen={menuOpen} onToggle={toggleMenu} />
      <MobileMenu menuOpen={menuOpen} />
      <HeroCopy />
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
