import { useEffect, useMemo, useRef } from 'react';
import {
  GALLERY_HEADING_DEFAULTS,
  GALLERY_HEADING_FONTS,
  GALLERY_HEADING_VARIANTS,
  GALLERY_HEADING_WEIGHTS,
} from './transformGalleryHeadingSource';
import './gallery-heading.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * GalleryHeading — Matte Rise (`rising-diagonal`) host.
 * Loads the transformed canonical Canvas 2D document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 */
export function GalleryHeading({
  variant = GALLERY_HEADING_DEFAULTS.variant,
  mode = GALLERY_HEADING_DEFAULTS.mode,
  font,
  weight,
  headlineSize,
  hue = GALLERY_HEADING_DEFAULTS.hue,
  saturation = GALLERY_HEADING_DEFAULTS.saturation,
  brightness = GALLERY_HEADING_DEFAULTS.brightness,
  /** Same-origin HTML URL for the transformed gallery-heading document. */
  documentSrc = '/effects/gallery-heading-coming-soon.html',
  /** Keep the ring orbiting without requiring hover (empty-state use). */
  autoPlay = false,
  className = '',
  style,
}) {
  const frameRef = useRef(null);
  const configuration =
    GALLERY_HEADING_VARIANTS[variant] ?? GALLERY_HEADING_VARIANTS[GALLERY_HEADING_DEFAULTS.variant];
  const safeMode = mode === 'light' ? 'light' : 'dark';
  const background = safeMode === 'light' ? '#f4f7fb' : '#000000';

  const type = configuration.type;
  const runtime = useMemo(() => {
    const resolvedWeight =
      weight && GALLERY_HEADING_WEIGHTS.includes(weight) ? weight : type.weight;
    return {
      font: (font && GALLERY_HEADING_FONTS[font]) ?? GALLERY_HEADING_FONTS[type.font],
      weight: resolvedWeight,
      headlineSize: clamp(headlineSize ?? type.headlineSize, 0.6, 1.8),
      ...(autoPlay ? { hover: 1 } : {}),
    };
  }, [autoPlay, font, headlineSize, type, weight]);

  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  const runtimeMessage = JSON.stringify(runtime);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const post = () => {
      frame.contentWindow?.postMessage({ threeuiRuntime: JSON.parse(runtimeMessage) }, '*');
    };
    post();
    frame.addEventListener('load', post);
    return () => frame.removeEventListener('load', post);
  }, [runtimeMessage, documentSrc]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || autoPlay) return undefined;
    let inside = false;

    const leave = () => {
      if (!inside) return;
      inside = false;
      frame.contentWindow?.postMessage({ threeuiRuntime: { hover: 0 } }, '*');
    };
    const onMessage = (event) => {
      if (event.source === frame.contentWindow && event.data?.threeuiPointerOver) inside = true;
    };
    const onPointerMove = (event) => {
      if (!inside) return;
      const bounds = frame.getBoundingClientRect();
      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;
      if (outside) leave();
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('pointermove', onPointerMove, true);
    frame.addEventListener('pointerleave', leave);
    document.addEventListener('mouseleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('pointermove', onPointerMove, true);
      frame.removeEventListener('pointerleave', leave);
      document.removeEventListener('mouseleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, [autoPlay, documentSrc]);

  const title = `${configuration.title} canvas animation`;

  return (
    <div
      className={`shader-frame gallery-heading-frame${className ? ` ${className}` : ''}`}
      data-mode={safeMode}
      data-variant={variant}
      style={style}
    >
      <iframe
        ref={frameRef}
        className="gallery-heading-iframe"
        data-mode={safeMode}
        title={title}
        src={documentSrc}
        sandbox="allow-scripts"
        loading="eager"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
          background,
          filter,
        }}
      />
    </div>
  );
}

export default GalleryHeading;
