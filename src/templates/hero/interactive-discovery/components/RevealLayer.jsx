import React, { useLayoutEffect, useRef } from 'react';
import { MASK_STOPS, SPOTLIGHT_R } from '../constants';
import { paintSpotlightMask, sizeCanvas } from '../utils/spotlightMath';

const RevealLayer = ({ image, smoothRef }) => {
  const canvasRef = useRef(null);
  const layerRef = useRef(null);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    if (!canvas || !layer) return undefined;

    const fit = () => {
      sizeCanvas(canvas, window.innerWidth, window.innerHeight);
    };

    fit();

    const tick = () => {
      const ctx = canvas.getContext('2d');
      if (ctx && smoothRef?.current) {
        const { x, y } = smoothRef.current;
        const maskUrl = paintSpotlightMask(ctx, x, y, SPOTLIGHT_R, MASK_STOPS);
        if (maskUrl) {
          layer.style.maskImage = `url(${maskUrl})`;
          layer.style.webkitMaskImage = `url(${maskUrl})`;
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener('resize', fit);
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', fit);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [smoothRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <div
        ref={layerRef}
        data-lithos-reveal
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: 'none',
          WebkitMaskImage: 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  );
};

export default RevealLayer;
