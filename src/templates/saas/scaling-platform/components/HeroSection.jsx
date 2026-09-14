import React, { memo } from 'react';
import { ABOUT_ID, HERO_ID, START_LABEL } from '../constants';
import ChamferButton from './ChamferButton';
import HeroHeadline from './HeroHeadline';
import HeroVideo from './HeroVideo';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

const HeroSection = memo(({ menuOpen, onToggle, onNavigate }) => (
  <section className="sp-hero" id={HERO_ID}>
    <HeroVideo />
    <div className="sp-hero-scrim" aria-hidden="true" />
    <Navbar menuOpen={menuOpen} onToggle={onToggle} />
    <MobileMenu menuOpen={menuOpen} onNavigate={onNavigate} />
    <HeroHeadline />
    <ChamferButton href={`#${ABOUT_ID}`}>{START_LABEL}</ChamferButton>
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;
