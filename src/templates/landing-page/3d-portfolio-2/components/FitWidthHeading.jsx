import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Scales a single-line heading so it exactly fills the container width (no side gap).
 */
const FitWidthHeading = ({ children, className = '', as: Tag = 'h1' }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const rafRef = useRef(0);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    text.style.fontSize = '100px';
    const textWidth = text.scrollWidth;
    if (!textWidth) return;

    const nextSize = (container.clientWidth / textWidth) * 100;
    text.style.fontSize = `${nextSize}px`;
  }, []);

  useEffect(() => {
    const scheduleFit = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(fit);
    };

    scheduleFit();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', scheduleFit);
      return () => {
        window.removeEventListener('resize', scheduleFit);
        cancelAnimationFrame(rafRef.current);
      };
    }

    const observer = new ResizeObserver(scheduleFit);
    observer.observe(container);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleFit).catch(() => {});
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [fit, children]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <Tag
        ref={textRef}
        className={`hero-heading block w-max max-w-none whitespace-nowrap font-black uppercase leading-none tracking-tight ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
};

export default FitWidthHeading;
