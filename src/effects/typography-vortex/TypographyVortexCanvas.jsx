import { useEffect, useRef } from 'react';
import { createTypographyVortexRenderer } from './typographyVortexRenderer';
import './typography-vortex.css';

export const TYPOGRAPHY_VORTEX_DEFAULTS = {
  mode: 'dark',
  phrase: 'SABLE / SYSTEMS IN MOTION / ',
  speed: 1,
  ringGrowth: 1.21,
  opacity: 1,
  dissolveRadius: 1,
  particleAmount: 1,
  suctionDuration: 920,
};

export function TypographyVortexCanvas({ className = '', hideHint = false, ...props }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({ ...TYPOGRAPHY_VORTEX_DEFAULTS, ...props });
  optionsRef.current = { ...TYPOGRAPHY_VORTEX_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;
    return createTypographyVortexRenderer(host, canvas, () => optionsRef.current);
  }, []);

  const mode = optionsRef.current.mode === 'light' ? 'light' : 'dark';

  return (
    <div
      ref={hostRef}
      className={`typography-vortex-component typography-vortex-component--${mode}${className ? ` ${className}` : ''}`}
      data-mode={mode}
      data-dissolve-state="ambient"
      data-suction-state="idle"
      data-particles="0"
      data-dissolve-strength="0.00"
    >
      <canvas ref={canvasRef} aria-label="Interactive typography vortex" />
      {hideHint ? null : (
        <span className="typography-vortex-component__hint">MOVE / DISSOLVE · CLICK / SUCTION</span>
      )}
    </div>
  );
}

export default TypographyVortexCanvas;
