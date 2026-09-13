import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './mostar.css';
import { BACK_ICON_SIZE, DETAIL_FALLBACK, HERO_TITLE } from './constants';
import { SCENE } from './content';
import { useCinemaScroll } from './hooks/useCinemaScroll';
import { useEmbedAutoplay } from './hooks/useEmbedAutoplay';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useSightSlider } from './hooks/useSightSlider';
import IntroCopy from './components/IntroCopy';
import SightsControls from './components/SightsControls';
import SightsSlider from './components/SightsSlider';
import SiteHeader from './components/SiteHeader';
import { StoryPanelBazaar, StoryPanelBridge } from './components/StoryPanels';

const LivePage = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const sectionRef = useRef(null);
  const { isEmbed, isStandalone } = useEmbedMode();
  usePageChrome();
  const sightsReady = useCinemaScroll(rootRef, sectionRef, isEmbed);
  const slider = useSightSlider(rootRef);
  useEmbedAutoplay(isEmbed);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <div ref={rootRef} className="mostar">
      <main className="site-shell">
        <section
          ref={sectionRef}
          className="cinema-scroll"
          id="cinema"
          aria-label="Mostar cinematic scroll story"
        >
          <div className="stage">
            <div className="world">
              <img className="scene-img sky-img" src={SCENE.sky} alt="" />
              <SiteHeader />
              <div className="back-stack">
                <img className="scene-img back-img back-four" src={SCENE.backFour} alt="" />
                <SightsSlider
                  copies={slider.copies}
                  activeSight={slider.activeSight}
                  jumping={slider.jumping}
                  trackRef={slider.trackRef}
                  onSelect={slider.selectSight}
                />
                <img className="scene-img back-img back-bazaar" src={SCENE.bazaar} alt="" />
              </div>
              <SightsControls
                ready={sightsReady}
                onPrev={slider.goPrev}
                onNext={slider.goNext}
              />
              <h1 className="hero-title">{HERO_TITLE}</h1>
              <img
                className="scene-img splitframe-img splitframe-left"
                src={SCENE.splitLeft}
                alt=""
              />
              <img
                className="scene-img splitframe-img splitframe-right"
                src={SCENE.splitRight}
                alt=""
              />
              <img className="scene-img bridge-img" src={SCENE.bridge} alt="" />
              <img className="scene-img frame-two-img" src={SCENE.frameTwo} alt="" />
              <div className="shade" />
            </div>
            <IntroCopy />
            <StoryPanelBridge />
            <StoryPanelBazaar />
          </div>
        </section>
      </main>

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-4 left-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-[#fdf1e1] backdrop-blur-md min-[375px]:left-4 min-[375px]:text-sm"
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
