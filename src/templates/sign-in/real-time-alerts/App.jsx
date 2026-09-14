import React, { useRef } from 'react';
import LoginCard, { HeroBadge } from './components/LoginCard';
import PhotoPanel from './components/PhotoPanel';
import { useEntrance } from './hooks/useEntrance';
import { useFalconPlay } from './hooks/useFalconPlay';
import { useSignalLayout } from './hooks/useSignalLayout';

export default function App({ preview = false }) {
  const rootRef = useRef(null);
  const photoRef = useRef(null);
  const paneRef = useRef(null);
  const cardRef = useRef(null);
  const cardInRef = useRef(null);
  const heroRef = useRef(null);
  const hlWrapRef = useRef(null);

  useSignalLayout({ preview, photoRef, paneRef, cardRef, cardInRef, heroRef, hlWrapRef, rootRef });
  useEntrance(rootRef);
  useFalconPlay(rootRef);

  return (
    <div className="stage" ref={rootRef}>
      <PhotoPanel photoRef={photoRef} heroRef={heroRef} hlWrapRef={hlWrapRef}>
        <HeroBadge />
      </PhotoPanel>
      <LoginCard paneRef={paneRef} cardRef={cardRef} cardInRef={cardInRef} />
    </div>
  );
}
