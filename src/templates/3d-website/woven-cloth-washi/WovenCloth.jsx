import React, { memo, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_BRIGHTNESS,
  DEFAULT_HUE,
  DEFAULT_SATURATION,
  FRAME_CLASS,
  FRAME_SANDBOX,
  FRAME_TITLE,
  HOST_ARIA_LABEL,
  HOST_BACKGROUND,
  HOST_CLASS,
  HOST_ROLE,
  SOURCE_URL,
  VARIANT_ID,
} from './constants';
import { useHostVisibility } from './hooks/useHostVisibility';
import { resolvePaletteFilter } from './utils/paletteFilter';
import './woven-cloth-washi.css';

export const WovenCloth = memo(function WovenCloth({
  className = '',
  style,
  variant = VARIANT_ID,
  hue = DEFAULT_HUE,
  saturation = DEFAULT_SATURATION,
  brightness = DEFAULT_BRIGHTNESS,
}) {
  const hostRef = useRef(null);
  const mounted = useHostVisibility(hostRef);
  const [ready, setReady] = useState(false);
  const paletteFilter = resolvePaletteFilter(hue, saturation, brightness);

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`${HOST_CLASS}${className ? ` ${className}` : ''}`}
      role={HOST_ROLE}
      aria-label={HOST_ARIA_LABEL}
      data-variant={variant}
      data-state={!mounted ? 'paused' : ready ? 'ready' : 'loading'}
      style={{ background: HOST_BACKGROUND, pointerEvents: 'auto', ...style }}
    >
      {mounted ? (
        <iframe
          className={`${FRAME_CLASS}${ready ? ' is-ready' : ''}`}
          title={FRAME_TITLE}
          src={SOURCE_URL}
          sandbox={FRAME_SANDBOX}
          loading="eager"
          referrerPolicy="no-referrer"
          onLoad={() => setReady(true)}
          style={paletteFilter ? { filter: paletteFilter } : undefined}
        />
      ) : null}
    </div>
  );
});

export default WovenCloth;
