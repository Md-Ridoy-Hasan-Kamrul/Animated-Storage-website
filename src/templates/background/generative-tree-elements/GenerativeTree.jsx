import { useCallback, useEffect, useRef, useState } from 'react';

export const GENERATIVE_TREE_DEFAULTS = {
  speed: 1,
  size: 1,
  particleAmount: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
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
const DEFAULT_SOURCE_URL = '/effects/generative-tree.html';
const HOST_BACKGROUND = '#0a0a0a';
const CONTROLS_TYPE = 'generative-tree-controls';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * CSP-safe host for the prebuilt Generative Tree Canvas 2D document.
 * Focused HTML lives at `/effects/generative-tree.html` (srcDoc scripts blocked).
 */
export function GenerativeTree({
  speed = GENERATIVE_TREE_DEFAULTS.speed,
  size = GENERATIVE_TREE_DEFAULTS.size,
  particleAmount = GENERATIVE_TREE_DEFAULTS.particleAmount,
  opacity = GENERATIVE_TREE_DEFAULTS.opacity,
  hue = GENERATIVE_TREE_DEFAULTS.hue,
  saturation = GENERATIVE_TREE_DEFAULTS.saturation,
  brightness = GENERATIVE_TREE_DEFAULTS.brightness,
  className = '',
  style,
  sourceUrl = DEFAULT_SOURCE_URL,
}) {
  const iframeRef = useRef(null);
  const [hostVisible, setHostVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const safeSpeed = clamp(speed, SPEED_MIN, SPEED_MAX);
  const paused = !hostVisible || !documentVisible || safeSpeed === 0;

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: CONTROLS_TYPE,
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
  }, [postControls, size, particleAmount]);

  return (
    <div
      className={`threeui-background generative-tree${className ? ` ${className}` : ''}`}
      data-variant="generative-tree"
      style={{ background: HOST_BACKGROUND, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title="Generative Tree background"
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
