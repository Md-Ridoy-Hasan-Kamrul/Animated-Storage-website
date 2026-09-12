import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ltx-world.css';
import {
  ANNOUNCE_LOADING,
  ANNOUNCE_READY,
  BACK_ICON_SIZE,
  BASE_CLIP_KEY,
  DETAIL_FALLBACK,
} from './constants';
import { parkVideoAtStart } from './utils/parkVideoAtStart';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useLtxFonts } from './hooks/useLtxFonts';
import { useClipReadiness } from './hooks/useClipReadiness';
import { useSeamSafePlayer } from './hooks/useSeamSafePlayer';
import VideoStack from './components/VideoStack';
import HeroCopy from './components/HeroCopy';
import SceneController from './components/SceneController';
import LtxHeader from './components/LtxHeader';
import RetryNotice from './components/RetryNotice';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const videosRef = useRef({});
  const [announcement, setAnnouncement] = useState(ANNOUNCE_LOADING);

  useLtxFonts();
  usePageChrome();

  const announce = useCallback((message) => {
    setAnnouncement(message);
  }, []);

  const { pairReady } = useClipReadiness(videosRef);
  const player = useSeamSafePlayer(videosRef, announce);

  useEffect(() => {
    const base = videosRef.current[BASE_CLIP_KEY];
    if (!base) return undefined;
    const park = () => {
      if (!parkVideoAtStart(base)) return;
      player.markReady();
      announce(ANNOUNCE_READY);
    };
    park();
    base.addEventListener('loadeddata', park);
    return () => base.removeEventListener('loadeddata', park);
  }, [announce, player.markReady]);

  const handleBack = useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);

  return (
    <main className="ltx-world">
      <div className={`stage${player.titleHidden ? ' title-hidden' : ''}`}>
        <VideoStack videosRef={videosRef} visibleKey={player.visibleKey} />
        <HeroCopy />
        <SceneController
          controllerMode={player.controllerMode}
          activeBranchId={player.activeBranchId}
          pairReady={pairReady}
          locked={player.lock}
          onBranchClick={player.handleBranchClick}
        />
        <LtxHeader />
        <p className="sr-live" aria-live="polite">
          {announcement}
        </p>
        <RetryNotice error={player.statusError} onRetry={player.handleRetry} />
      </div>

      {isStandalone ? (
        <button
          type="button"
          onClick={handleBack}
          className="fixed left-3 top-3 z-[70] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md min-[375px]:left-4 min-[375px]:top-4 min-[375px]:text-sm"
          aria-label="Go back"
        >
          <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={2} />
          Back
        </button>
      ) : null}
    </main>
  );
};

export default LivePage;
