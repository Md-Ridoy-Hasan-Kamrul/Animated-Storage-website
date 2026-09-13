import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './wellness-hero.css';
import {
  DETAIL_FALLBACK,
  HISTORY_CAN_GO_BACK_MIN,
  MOBILE_SPACER_CLASS,
  OVERLAY_CLASS,
  PAGE_CLASS,
} from './constants';
import BackButton from './components/BackButton';
import HeroCopy from './components/HeroCopy';
import HeroVideo from './components/HeroVideo';
import MobileMenu from './components/MobileMenu';
import Navbar from './components/Navbar';
import { useAuraiFonts } from './hooks/useAuraiFonts';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useMobileMenu } from './hooks/useMobileMenu';
import { usePageChrome } from './hooks/usePageChrome';

const LivePage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const { isStandalone } = useEmbedMode();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  useAuraiFonts();
  usePageChrome();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > HISTORY_CAN_GO_BACK_MIN) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  const handleJoin = useCallback(() => {
    closeMenu();
    emailRef.current?.focus();
  }, [closeMenu]);

  const handleNavigate = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <section className={PAGE_CLASS}>
      <HeroVideo />
      <div className={OVERLAY_CLASS}>
        <Navbar isOpen={isOpen} onToggle={toggleMenu} onJoin={handleJoin} />
        <MobileMenu isOpen={isOpen} onNavigate={handleNavigate} onJoin={handleJoin} />
        <div className={MOBILE_SPACER_CLASS} />
        <HeroCopy inputRef={emailRef} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </section>
  );
};

export default LivePage;
