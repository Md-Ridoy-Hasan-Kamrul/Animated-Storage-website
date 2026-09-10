import React, { useCallback, useEffect, useRef, useState } from 'react';

const Magnet = ({
  children,
  className = '',
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const reset = useCallback(() => {
    setActive(false);
    setOffset({ x: 0, y: 0 });
  }, []);

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
        setActive(true);
        setOffset({
          x: (event.clientX - centerX) / strength,
          y: (event.clientY - centerY) / strength,
        });
      } else if (active) {
        reset();
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [active, padding, reset, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
