import { useCallback, useEffect, useRef, useState } from 'react';

export const ELEMENT_VARIANTS = ['water', 'lightning', 'fire'];

export const ELEMENTS_DEFAULTS = {
  variant: 'water',
  speed: 1,
  size: 1,
  particleAmount: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const VARIANT_LABELS = {
  water: 'Water',
  lightning: 'Lightning',
  fire: 'Fire',
};

const SPEED_MIN = 0;
const SPEED_MAX = 3;
const OPACITY_MIN = 0.05;
const OPACITY_MAX = 1;
const HUE_MIN = -180;
const HUE_MAX = 180;
const SATURATION_MIN = 0;
const SATURATION_MAX = 2;
const BRIGHTNESS_MIN = 0.35;
const BRIGHTNESS_MAX = 1.8;
const DEFAULT_SOURCE_URL = '/effects/elemental-water.html';
const HOST_BACKGROUND = '#060708';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * CSP-safe host for the prebuilt Elemental Marks document.
 * Focused water HTML lives at `/effects/elemental-water.html` (scripts blocked in srcDoc).
 */
export function ElementsBackground({
  variant = ELEMENTS_DEFAULTS.variant,
  speed = ELEMENTS_DEFAULTS.speed,
  size = ELEMENTS_DEFAULTS.size,
  particleAmount = ELEMENTS_DEFAULTS.particleAmount,
  opacity = ELEMENTS_DEFAULTS.opacity,
  hue = ELEMENTS_DEFAULTS.hue,
  saturation = ELEMENTS_DEFAULTS.saturation,
  brightness = ELEMENTS_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = DEFAULT_SOURCE_URL,
}) {
  const iframeRef = useRef(null);
  const [hostVisible, setHostVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const safeVariant = ELEMENT_VARIANTS.includes(variant) ? variant : ELEMENTS_DEFAULTS.variant;
  const safeSpeed = clamp(speed, SPEED_MIN, SPEED_MAX);
  const paused = !hostVisible || !documentVisible;

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'elements-controls',
        controls: { speed: safeSpeed, paused },
      },
      '*',
    );
  }, [paused, safeSpeed]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setHostVisible(entry?.isIntersecting ?? true),
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    postControls();
  }, [postControls, safeVariant, size, particleAmount]);

  return (
    <div
      className={`threeui-background elements${className ? ` ${className}` : ''}`}
      data-element={safeVariant}
      style={{ background: HOST_BACKGROUND, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title={`${VARIANT_LABELS[safeVariant]} element background`}
        src={sourceUrl}
        sandbox="allow-scripts"
        onLoad={postControls}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
          background: HOST_BACKGROUND,
          opacity: clamp(opacity, OPACITY_MIN, OPACITY_MAX),
          filter: `hue-rotate(${clamp(hue, HUE_MIN, HUE_MAX)}deg) saturate(${clamp(saturation, SATURATION_MIN, SATURATION_MAX)}) brightness(${clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX)})`,
        }}
      />
    </div>
  );
}
