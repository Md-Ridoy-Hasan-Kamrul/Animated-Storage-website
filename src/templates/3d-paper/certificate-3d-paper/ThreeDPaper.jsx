import React, { memo, useEffect, useRef, useState } from 'react';
import {
  FRAME_SANDBOX,
  HOST_ARIA_LABEL,
  THREE_D_PAPER_DEFAULT_PROPS,
} from './constants';
import { resolvePaperVariant } from './sceneConfig';
import './certificate-3d-paper.css';

export const ThreeDPaper = memo(function ThreeDPaper({
  variant = THREE_D_PAPER_DEFAULT_PROPS.variant,
  className = '',
  style,
}) {
  const hostRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const { label, background, source, variant: safeVariant } = resolvePaperVariant(variant);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver !== 'function') return undefined;

    const syncDocumentVisibility = () => {
      setIsVisible(document.visibilityState !== 'hidden');
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting) && document.visibilityState !== 'hidden');
      },
      { threshold: 0.01 },
    );

    observer.observe(host);
    document.addEventListener('visibilitychange', syncDocumentVisibility);
    syncDocumentVisibility();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncDocumentVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) setReady(false);
  }, [isVisible]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background three-d-paper${className ? ` ${className}` : ''}`}
      data-variant={safeVariant}
      role="img"
      aria-label={HOST_ARIA_LABEL}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      {isVisible ? (
        <iframe
          className={`three-d-paper__frame${ready ? ' is-ready' : ''}`}
          title={label}
          src={source}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          referrerPolicy="no-referrer"
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
});

export default ThreeDPaper;
