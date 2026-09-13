import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './synth-mode.css';
import {
  BACK_BUTTON_CLASS,
  BACK_ICON_SIZE,
  DETAIL_FALLBACK,
  MAIN_CLASS,
  PAGE_SHELL_CLASS,
} from './constants';
import FeatureBlock from './components/FeatureBlock';
import HeroCopy from './components/HeroCopy';
import ImageRevealBackground from './components/ImageRevealBackground';
import MobileHeroImage from './components/MobileHeroImage';
import SideDrawer from './components/SideDrawer';
import SiteHeader from './components/SiteHeader';
import { useCart } from './hooks/useCart';
import { useDrawer } from './hooks/useDrawer';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useSynthFonts } from './hooks/useSynthFonts';

const LivePage = () => {
  const navigate = useNavigate();
  const { isEmbed, isStandalone } = useEmbedMode();
  const { drawer, openDrawer, closeDrawer } = useDrawer();
  const { lines, count, addItem, removeItem, checkout } = useCart();

  useSynthFonts();
  usePageChrome();

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  const handleCheckout = useCallback(() => {
    checkout(closeDrawer);
  }, [checkout, closeDrawer]);

  return (
    <div className={PAGE_SHELL_CLASS}>
      <ImageRevealBackground isEmbed={isEmbed} />
      <SiteHeader cartCount={count} onOpen={openDrawer} onClose={closeDrawer} />

      <main className={MAIN_CLASS}>
        <HeroCopy onShop={() => openDrawer('shop')} />
        <FeatureBlock />
      </main>

      <MobileHeroImage />

      <SideDrawer
        drawer={drawer}
        onClose={closeDrawer}
        cart={lines}
        onAdd={addItem}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      {isStandalone ? (
        <button type="button" onClick={handleBack} className={BACK_BUTTON_CLASS} aria-label="Go back">
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={2} />
          Back
        </button>
      ) : null}
    </div>
  );
};

export default LivePage;
