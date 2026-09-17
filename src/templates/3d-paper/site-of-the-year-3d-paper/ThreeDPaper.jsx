import React, { useEffect, useRef, useState } from 'react';
import {
  FRAME_SANDBOX,
  HOST_ARIA_LABEL,
  THREE_D_PAPER_DEFAULT_PROPS,
} from './constants';
import { resolvePaperVariant } from './sceneConfig';
import './site-of-the-year-3d-paper.css';

/**
 * ThreeDPaper — Site of the Year host.
 * Loads the authored document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 * Visibility lifecycle matches ThreeUI: pause when hidden / off-screen.
 */
export function ThreeDPaper({
  variant = THREE_D_PAPER_DEFAULT_PROPS.variant,
  className = '',
  style,
  documentSrc,
}) {
  const hostRef = useRef(null);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [hostVisible, setHostVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const { label, background, source, variant: safeVariant } = resolvePaperVariant(variant);
  const frameSource = documentSrc || source;
  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHostVisible(entry?.isIntersecting ?? true);
      },
      { rootMargin: '80px' },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    setReady(false);
  }, [mounted, safeVariant, frameSource]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background three-d-paper${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={HOST_ARIA_LABEL}
      data-variant={safeVariant}
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      {mounted ? (
        <iframe
          className={`three-d-paper__frame${ready ? ' is-ready' : ''}`}
          title={label}
          src={frameSource}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
}

export default ThreeDPaper;
