import React, { memo, useEffect, useRef, useState } from 'react';
import {
  FRAME_CLASS,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HOST_ARIA_LABEL,
  HOST_BACKGROUND,
  HOST_CLASS,
  HOST_ROLE,
  INTERSECTION_ROOT_MARGIN,
  SOURCE_URL,
} from './constants';
import './ashen-press.css';

export const AshenPress = memo(function AshenPress({ className = '', style }) {
  const hostRef = useRef(null);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [hostVisible, setHostVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHostVisible(entry?.isIntersecting ?? true);
      },
      { rootMargin: INTERSECTION_ROOT_MARGIN },
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

  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`${HOST_CLASS}${className ? ` ${className}` : ''}`}
      role={HOST_ROLE}
      aria-label={HOST_ARIA_LABEL}
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      style={{ background: HOST_BACKGROUND, pointerEvents: 'auto', ...style }}
    >
      {mounted ? (
        <iframe
          className={`${FRAME_CLASS}${ready ? ' is-ready' : ''}`}
          title={FRAME_TITLE}
          src={SOURCE_URL}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          referrerPolicy="no-referrer"
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
});

export default AshenPress;
