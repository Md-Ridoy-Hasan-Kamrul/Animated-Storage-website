import React, { useEffect, useRef } from 'react';
import { FRAME_SANDBOX } from './constants';
import {
  postLiveControls,
  resolveLiveControls,
  resolveSceneChrome,
  resolveSceneFilter,
} from './sceneConfig';
import './flux-vortex-structure-flow.css';

/**
 * StructureFlowCollection — Flux Vortex host.
 * Loads the focus-isolated authored document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 * Speed/opacity stay live via postMessage (NeuformBatch control contract).
 */
export function StructureFlowCollection({
  variant = 'flux-vortex',
  speed = 1,
  size = 1,
  length = 1,
  density = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className = '',
  style,
  documentSrc,
}) {
  const iframeRef = useRef(null);
  const { label, background, source, variant: safeVariant } = resolveSceneChrome(variant);
  const filter = resolveSceneFilter(hue, saturation, brightness);
  const frameSource = documentSrc || source;
  const controls = resolveLiveControls({ speed, size, length, density, opacity });

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame) return undefined;

    const pushControls = () => postLiveControls(frame.contentWindow, controls);
    pushControls();
    frame.addEventListener('load', pushControls);
    return () => frame.removeEventListener('load', pushControls);
  }, [
    controls.density,
    controls.length,
    controls.opacity,
    controls.size,
    controls.speed,
  ]);

  return (
    <div
      className={`threeui-background structure-flow-collection${className ? ` ${className}` : ''}`}
      data-variant={safeVariant}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title={label}
        src={frameSource}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        data-mode="dark"
        style={{
          position: 'absolute',
          inset: 0,
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

export default StructureFlowCollection;
