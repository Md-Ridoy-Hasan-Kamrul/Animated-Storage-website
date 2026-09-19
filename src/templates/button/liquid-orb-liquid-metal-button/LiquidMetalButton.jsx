import './liquid-metal-button.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EMBEDDED_DEFAULT,
  FRAME_SANDBOX,
  FRAME_TITLE,
  INTERSECTION_ROOT_MARGIN,
  LIQUID_ORB_DEFAULT_PROPS,
  SOURCE_URL,
  TEXT_DEFAULT,
  TEXT_MAX_LEN,
  VARIANT_ID,
} from './constants';

export const LIQUID_METAL_BUTTON_DEFAULTS = { ...LIQUID_ORB_DEFAULT_PROPS };

function resolveOrbText(text) {
  return String(text ?? TEXT_DEFAULT).slice(0, TEXT_MAX_LEN);
}

/**
 * LiquidMetalButton host for the Liquid Orb (circle) variant.
 * CSP-safe: mounts the circle-adapted document at `/effects/liquid-orb-liquid-metal-button.html`
 * (canonical HTML + CIRCLE_RUNTIME_STYLE + LIQUID_METAL_BUTTON_BRIDGE from ThreeUI).
 * Visibility unmounts the iframe.
 */
export function LiquidMetalButton({
  className = '',
  variant = LIQUID_METAL_BUTTON_DEFAULTS.variant,
  text = LIQUID_METAL_BUTTON_DEFAULTS.text,
  embedded = EMBEDDED_DEFAULT,
  onClick,
  sourceUrl = SOURCE_URL,
}) {
  void variant;

  const hostRef = useRef(null);
  const frameRef = useRef(null);
  const intersectsRef = useRef(true);
  const [mounted, setMounted] = useState(true);
  const [ready, setReady] = useState(false);

  const safeText = resolveOrbText(text);

  const syncButtonConfig = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      {
        liquidMetalButton: { text: safeText, embedded },
      },
      '*',
    );
  }, [embedded, safeText]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return undefined;

    const sync = () => setMounted(intersectsRef.current && document.visibilityState !== 'hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectsRef.current = entry.isIntersecting;
        sync();
      },
      { rootMargin: INTERSECTION_ROOT_MARGIN },
    );

    observer.observe(host);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (!mounted) setReady(false);
  }, [mounted]);

  useEffect(() => {
    if (!ready) return undefined;
    syncButtonConfig();
    return undefined;
  }, [ready, syncButtonConfig]);

  useEffect(() => {
    if (!onClick) return undefined;
    const receiveMessage = (event) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.liquidMetalButton?.type !== 'activate') return;
      onClick();
    };
    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, [onClick]);

  const hostClassName = className ? `liquid-metal-button ${className}` : 'liquid-metal-button';
  const frameClassName = ready
    ? 'liquid-metal-button__frame is-ready'
    : 'liquid-metal-button__frame';

  return (
    <div
      ref={hostRef}
      className={hostClassName}
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      data-variant={VARIANT_ID}
    >
      {mounted ? (
        <iframe
          ref={frameRef}
          className={frameClassName}
          title={FRAME_TITLE}
          src={sourceUrl}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          onLoad={() => {
            setReady(true);
            syncButtonConfig();
          }}
        />
      ) : null}
    </div>
  );
}

export default LiquidMetalButton;
