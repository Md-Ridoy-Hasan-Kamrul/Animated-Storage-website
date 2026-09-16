import React from 'react';
import { FRAME_SANDBOX } from './constants';
import { resolveSceneChrome, resolveSceneFilter } from './sceneConfig';
import './nebula-structure-flow.css';

/**
 * StructureFlowCollection — Nebula host.
 * Loads the focus-isolated authored document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 */
export function StructureFlowCollection({
  variant = 'nebula',
  hue = 0,
  saturation = 1,
  brightness = 1,
  className = '',
  style,
  documentSrc,
}) {
  const { label, background, source, variant: safeVariant } = resolveSceneChrome(variant);
  const filter = resolveSceneFilter(hue, saturation, brightness);
  const frameSource = documentSrc || source;

  return (
    <div
      className={`threeui-background structure-flow-collection${className ? ` ${className}` : ''}`}
      data-variant={safeVariant}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      <iframe
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
