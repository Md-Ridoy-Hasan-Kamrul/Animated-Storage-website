import React, { useLayoutEffect, useRef, useState } from 'react';
import { MASK_STOPS, SPOTLIGHT_R } from '../constants';
import { paintSpotlightMask, sizeCanvas } from '../utils/spotlightMath';

const RevealLayer = ({ image, cursorX, cursorY }) => {
  const canvasRef = useRef(null);
  const [maskUrl, setMaskUrl] = useState('');

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const fit = () => {
      sizeCanvas(canvas, window.innerWidth, window.innerHeight);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    setMaskUrl(paintSpotlightMask(ctx, cursorX, cursorY, SPOTLIGHT_R, MASK_STOPS));
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <div
        data-lithos-reveal
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          maskImage: maskUrl ? `url(${maskUrl})` : 'none',
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  );
};

export default RevealLayer;
