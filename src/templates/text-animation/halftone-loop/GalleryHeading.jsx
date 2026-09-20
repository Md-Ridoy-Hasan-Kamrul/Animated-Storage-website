import { useEffect, useMemo, useRef } from 'react';
import {
  BRIGHTNESS_MAX,
  BRIGHTNESS_MIN,
  DEFAULT_MODE,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HALFTONE_LOOP_DEFAULT_PROPS,
  HEADLINE_SIZE_MAX,
  HEADLINE_SIZE_MIN,
  HUE_MAX,
  HUE_MIN,
  LIGHT_MODE_BG,
  PAGE_BG,
  SATURATION_MAX,
  SATURATION_MIN,
  SOURCE_URL,
  VARIANT_ID,
} from './constants';
import './halftone-loop.css';

export const GALLERY_HEADING_DEFAULTS = { ...HALFTONE_LOOP_DEFAULT_PROPS };

const VERTICAL_LOOP = 'vertical-loop';

const GALLERY_HEADING_FONTS = {
  sans: '"Helvetica Neue",Helvetica,"Inter",Arial,system-ui,sans-serif',
  serif: '"Times New Roman",Times,"Liberation Serif","Nimbus Roman",serif',
  didone: 'Didot,"Bodoni 72","Bodoni MT","Playfair Display",Georgia,serif',
  oldstyle: '"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif',
};

const GALLERY_HEADING_WEIGHTS = ['400', '700'];

const TYPE_DEFAULTS = {
  font: 'didone',
  weight: '400',
  headlineSize: 1.25,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveVariant(variant) {
  return variant === VERTICAL_LOOP ? VERTICAL_LOOP : VARIANT_ID;
}

function resolveMode(mode) {
  return mode === 'light' ? 'light' : DEFAULT_MODE;
}

function resolveFont(font) {
  return (font && GALLERY_HEADING_FONTS[font]) || GALLERY_HEADING_FONTS[TYPE_DEFAULTS.font];
}

function resolveWeight(weight) {
  return weight && GALLERY_HEADING_WEIGHTS.includes(weight) ? weight : TYPE_DEFAULTS.weight;
}

function buildPaletteFilter(hue, saturation, brightness) {
  if (hue === 0 && saturation === 1 && brightness === 1) return undefined;
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

function buildRuntimeMessage({ font, weight, headlineSize, autoPlay }) {
  return JSON.stringify({
    font: resolveFont(font),
    weight: resolveWeight(weight),
    headlineSize: clamp(headlineSize ?? TYPE_DEFAULTS.headlineSize, HEADLINE_SIZE_MIN, HEADLINE_SIZE_MAX),
    ...(autoPlay ? { hover: 1 } : {}),
  });
}

function useRuntimeBridge(frameRef, runtimeMessage, documentSrc) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const post = () => {
      frame.contentWindow?.postMessage({ threeuiRuntime: JSON.parse(runtimeMessage) }, '*');
    };
    post();
    frame.addEventListener('load', post);
    return () => frame.removeEventListener('load', post);
  }, [frameRef, runtimeMessage, documentSrc]);
}

function useHoverBridge(frameRef, autoPlay, documentSrc) {
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
  }, [frameRef, autoPlay, documentSrc]);
}

/**
 * CSP-safe GalleryHeading host for Halftone Loop (`vertical-loop`).
 * Mounts the focused Neuform document at `/effects/halftone-loop.html`.
 */
export function GalleryHeading({
  variant = GALLERY_HEADING_DEFAULTS.variant,
  mode = GALLERY_HEADING_DEFAULTS.mode,
  font = GALLERY_HEADING_DEFAULTS.font,
  weight = GALLERY_HEADING_DEFAULTS.weight,
  headlineSize = GALLERY_HEADING_DEFAULTS.headlineSize,
  hue = GALLERY_HEADING_DEFAULTS.hue,
  saturation = GALLERY_HEADING_DEFAULTS.saturation,
  brightness = GALLERY_HEADING_DEFAULTS.brightness,
  documentSrc = SOURCE_URL,
  autoPlay = false,
  className = '',
  style,
}) {
  const frameRef = useRef(null);
  const safeVariant = resolveVariant(variant);
  const safeMode = resolveMode(mode);
  const safeHue = clamp(hue, HUE_MIN, HUE_MAX);
  const safeSaturation = clamp(saturation, SATURATION_MIN, SATURATION_MAX);
  const safeBrightness = clamp(brightness, BRIGHTNESS_MIN, BRIGHTNESS_MAX);
  const filter = buildPaletteFilter(safeHue, safeSaturation, safeBrightness);
  const background = safeMode === 'light' ? LIGHT_MODE_BG : PAGE_BG;

  const runtimeMessage = useMemo(
    () => buildRuntimeMessage({ font, weight, headlineSize, autoPlay }),
    [autoPlay, font, headlineSize, weight],
  );

  useRuntimeBridge(frameRef, runtimeMessage, documentSrc);
  useHoverBridge(frameRef, autoPlay, documentSrc);

  const hostClassName = className
    ? `shader-frame gallery-heading-frame ${className}`
    : 'shader-frame gallery-heading-frame';

  return (
    <div
      className={hostClassName}
      data-variant={safeVariant}
      data-mode={safeMode}
      style={style}
    >
      <iframe
        ref={frameRef}
        className="gallery-heading-iframe"
        data-mode={safeMode}
        title={FRAME_TITLE}
        src={documentSrc}
        sandbox={FRAME_SANDBOX}
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
