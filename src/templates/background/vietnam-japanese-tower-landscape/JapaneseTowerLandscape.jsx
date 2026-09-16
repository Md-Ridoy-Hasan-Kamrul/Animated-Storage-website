import React, { useEffect, useState } from 'react';
import { FRAME_SANDBOX } from './constants';
import { resolveFrameSource, resolveSceneChrome } from './sceneConfig';
import './vietnam-japanese-tower-landscape.css';

/**
 * JapaneseTowerLandscape — Vietnam host.
 * Loads the authored Towers document from a same-origin URL
 * (CSP blocks srcDoc inline scripts: script-src 'self').
 * Country is passed as ?country= to match the ThreeUI contract.
 */
export function JapaneseTowerLandscape({
  country = 'vietnam',
  className = '',
  style,
  documentSrc,
  sourceUrl,
}) {
  const [ready, setReady] = useState(false);
  const { label, background, country: safeCountry } = resolveSceneChrome(country);
  const frameSource = resolveFrameSource(safeCountry, documentSrc || sourceUrl);

  useEffect(() => {
    setReady(false);
  }, [frameSource]);

  return (
    <div
      className={`japanese-tower-landscape${className ? ` ${className}` : ''}`}
      data-country={safeCountry}
      data-state={ready ? 'ready' : 'loading'}
      style={{ background, pointerEvents: 'auto', ...style }}
    >
      <iframe
        key={safeCountry}
        className={`japanese-tower-landscape__frame${ready ? ' is-ready' : ''}`}
        title={label}
        src={frameSource}
        sandbox={FRAME_SANDBOX}
        loading="eager"
        onLoad={() => setReady(true)}
      />
    </div>
  );
}

export default JapaneseTowerLandscape;
