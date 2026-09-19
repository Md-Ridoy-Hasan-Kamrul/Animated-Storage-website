import './liquid-metal-button.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  EMBEDDED_DEFAULT,
  FRAME_SANDBOX,
  FRAME_TITLE,
  INTERSECTION_ROOT_MARGIN,
  PILL_WIDTH_BASE,
  PILL_WIDTH_MAX,
  PILL_WIDTH_MIN,
  PILL_WIDTH_PER_CHAR,
  SIGN_UP_PILL_DEFAULT_PROPS,
  SOURCE_URL,
  TEXT_DEFAULT,
  TEXT_MAX_LEN,
  VARIANT_ID,
} from './constants';

export const LIQUID_METAL_BUTTON_DEFAULTS = { ...SIGN_UP_PILL_DEFAULT_PROPS };

function resolvePillText(text) {
  return String(text ?? TEXT_DEFAULT).slice(0, TEXT_MAX_LEN);
}

function resolvePillWidthUnits(safeText) {
  return Math.min(
    PILL_WIDTH_MAX,
    Math.max(PILL_WIDTH_MIN, PILL_WIDTH_BASE + safeText.length * PILL_WIDTH_PER_CHAR),
  );
}

/**
 * LiquidMetalButton host for the Sign up Pill variant.
 * CSP-safe: mounts the pill-adapted document at `/effects/sign-up-pill-liquid-metal-button.html`
 * (canonical HTML + LIQUID_METAL_BUTTON_BRIDGE from ThreeUI LiquidMetalButton.tsx).
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

  const safeText = resolvePillText(text);
  const pillWidthUnits = useMemo(() => resolvePillWidthUnits(safeText), [safeText]);

  const syncButtonConfig = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      {
        liquidMetalButton: { text: safeText, pillWidthUnits, embedded },
      },
      '*',
    );
  }, [embedded, pillWidthUnits, safeText]);

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
