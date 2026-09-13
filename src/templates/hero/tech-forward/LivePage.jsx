import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './tech-forward.css';
import {
  BACK_ICON_SIZE,
  BACK_ICON_STROKE,
  DETAIL_FALLBACK,
  HISTORY_CAN_GO_BACK_MIN,
  MOTION_EASE,
  PAGE_CLASS,
  REDUCED_MOTION_NEVER,
  TWEEN_TYPE,
} from './constants';
import HeroFooter from './components/HeroFooter';
import HeroVideo from './components/HeroVideo';
import Navbar from './components/Navbar';
import { useEmbedMode } from './hooks/useEmbedMode';
import { useHeroEntrance } from './hooks/useHeroEntrance';
import { useInterFonts } from './hooks/useInterFonts';
import { usePageChrome } from './hooks/usePageChrome';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const entrance = useHeroEntrance();

  useInterFonts();
  usePageChrome();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > HISTORY_CAN_GO_BACK_MIN) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <MotionConfig reducedMotion={REDUCED_MOTION_NEVER} transition={{ type: TWEEN_TYPE, ease: MOTION_EASE }}>
      <div className={PAGE_CLASS}>
        <HeroVideo entrance={entrance} />
        <Navbar entrance={entrance} />
        <HeroFooter entrance={entrance} />

        {isStandalone ? (
          <button type="button" className="tf-back" onClick={handleBack} aria-label="Go back">
            <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={BACK_ICON_STROKE} />
            Back
          </button>
        ) : null}
      </div>
    </MotionConfig>
  );
};

export default LivePage;
