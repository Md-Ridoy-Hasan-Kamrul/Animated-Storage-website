import './liquid-metal-button.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACCESSIBLE_LABEL_DEFAULT,
  DIAMETER_DEFAULT,
  DIAMETER_MAX,
  DIAMETER_MIN,
  FRAME_SANDBOX,
  FRAME_TITLE,
  INTERSECTION_ROOT_MARGIN,
  PLAY_CIRCLE_DEFAULT_PROPS,
  SOURCE_URL,
  STROKE_DEFAULT,
  STROKE_MAX,
  STROKE_MIN,
  TEXT_MAX_LEN,
  VARIANT_ID,
} from './constants';

export const LIQUID_METAL_BUTTON_DEFAULTS = { ...PLAY_CIRCLE_DEFAULT_PROPS };

function clamp(value, min, max, fallback) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

function resolvePlayText(text) {
  return String(text ?? ACCESSIBLE_LABEL_DEFAULT).slice(0, TEXT_MAX_LEN);
}

/**
 * LiquidMetalButton host for the Play Circle variant.
 * CSP-safe: mounts the play-adapted document at `/effects/play-circle-liquid-metal-button.html`
 * (same transforms as ThreeUI LiquidMetalButton.tsx play path). Visibility unmounts the iframe.
 */
export function LiquidMetalButton({
  className = '',
  variant = LIQUID_METAL_BUTTON_DEFAULTS.variant,
  rendering = LIQUID_METAL_BUTTON_DEFAULTS.rendering,
  diameter = LIQUID_METAL_BUTTON_DEFAULTS.diameter,
  strokeWidth = LIQUID_METAL_BUTTON_DEFAULTS.strokeWidth,
  text = LIQUID_METAL_BUTTON_DEFAULTS.text,
  onClick,
  sourceUrl = SOURCE_URL,
}) {
  void variant;

  const hostRef = useRef(null);
  const frameRef = useRef(null);
  const intersectsRef = useRef(true);
  const [mounted, setMounted] = useState(true);
  const [ready, setReady] = useState(false);

  const safeText = resolvePlayText(text);
  const playConfig = useMemo(
    () => ({
      diameter: clamp(diameter, DIAMETER_MIN, DIAMETER_MAX, DIAMETER_DEFAULT),
      strokeWidth: clamp(strokeWidth, STROKE_MIN, STROKE_MAX, STROKE_DEFAULT),
      rendering: rendering === 'monotone' ? 'monotone' : 'colored',
      text: safeText,
    }),
    [diameter, rendering, safeText, strokeWidth],
  );

  const syncPlayConfig = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage({ liquidMetalPlayButton: playConfig }, '*');
  }, [playConfig]);

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
    syncPlayConfig();
    return undefined;
  }, [ready, syncPlayConfig]);

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
            syncPlayConfig();
          }}
        />
      ) : null}
    </div>
  );
}

export default LiquidMetalButton;
