import React, { useEffect, useRef, useState } from 'react';
import { FRAME_SANDBOX } from './constants';
import { useDocumentVisibility } from './hooks/useDocumentVisibility';
import { useHostVisibility } from './hooks/useHostVisibility';
import {
  resolveSceneChrome,
  resolveSceneSource,
  resolveSylvaVariant,
} from './sceneConfig';
import './living-green-sylva-living-world.css';

/**
 * SylvaLivingWorldScene — Living Green host.
 * Loads the scene-only authored document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 */
export function SylvaLivingWorldScene({
  variant = 'living-green',
  className = '',
  style,
  documentSrc,
}) {
  const safeVariant = resolveSylvaVariant(variant);
  const hostRef = useRef(null);
  const hostVisible = useHostVisibility(hostRef);
  const documentVisible = useDocumentVisibility();
  const [ready, setReady] = useState(false);
  const { label, background } = resolveSceneChrome(safeVariant);
  const source = resolveSceneSource(safeVariant, documentSrc);
  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    setReady(false);
  }, [mounted, safeVariant, source]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background sylva-living-world-scene${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`${label} with ferns, flowers, pollen, and a butterfly`}
      data-variant={safeVariant}
      data-state={ready ? 'ready' : 'loading'}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      {mounted ? (
        <iframe
          key={safeVariant}
          title={label}
          src={source}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            width: '100%',
            height: '100%',
            border: 0,
            background,
          }}
        />
      ) : null}
    </div>
  );
}

export default SylvaLivingWorldScene;
