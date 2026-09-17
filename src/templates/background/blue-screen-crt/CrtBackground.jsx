import { useEffect, useRef } from 'react';
import { createCrtRenderer, crtStyle, CRT_DEFAULTS, CRT_VARIANTS } from './crtRenderer';

export { CRT_VARIANTS };

function resolveHostFilter(hue, saturation, brightness) {
  return `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
}

export function CrtBackground({ className = '', ...props }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({ ...CRT_DEFAULTS, ...props });
  optionsRef.current = { ...CRT_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const renderer = createCrtRenderer(host, canvas, () => optionsRef.current);
    let frame = 0;
    let visible = true;

    const resize = () => {
      renderer.resize();
      renderer.render(performance.now());
    };

    const tick = (now) => {
      renderer.render(now);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(host);
    intersection.observe(host);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.dispose();
    };
  }, []);

  const options = optionsRef.current;
  const style = crtStyle(options.variant);

  return (
    <div
      ref={hostRef}
      className={`threeui-background crt crt-${options.variant}${className ? ` ${className}` : ''}`}
      style={{
        background: style.background,
        opacity: options.opacity,
        filter: resolveHostFilter(options.hue, options.saturation, options.brightness),
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default CrtBackground;
