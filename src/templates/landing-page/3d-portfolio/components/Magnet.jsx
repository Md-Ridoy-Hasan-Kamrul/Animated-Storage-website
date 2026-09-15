import React, { useCallback, useEffect, useRef } from 'react';

const Magnet = ({
  children,
  className = '',
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef(null);
  const activeRef = useRef(false);

  const applyTransform = useCallback((x, y, active) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    el.style.transition = active ? activeTransition : inactiveTransition;
  }, [activeTransition, inactiveTransition]);

  const reset = useCallback(() => {
    activeRef.current = false;
    applyTransform(0, 0, false);
  }, [applyTransform]);

  useEffect(() => {
    const onMove = (event) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const withinX =
        event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
      const withinY =
        event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

      if (withinX && withinY) {
        activeRef.current = true;
        applyTransform(
          (event.clientX - centerX) / strength,
          (event.clientY - centerY) / strength,
          true,
        );
      } else if (activeRef.current) {
        reset();
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [applyTransform, padding, reset, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: 'translate3d(0px, 0px, 0)',
        transition: inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
