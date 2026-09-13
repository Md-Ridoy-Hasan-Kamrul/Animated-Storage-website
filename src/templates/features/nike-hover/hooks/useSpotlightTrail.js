import { useCallback, useEffect, useRef } from 'react';
import {
  FOLLOWER_LERP,
  LEADER_LERP,
  NUM_TRAILS,
  TRAIL_HIDDEN,
} from '../constants';
import { makeTrailPoints, stepTrail } from '../utils/trailMath';

function readTouchPoint(event) {
  const touch = event.touches?.[0];
  if (!touch) return null;
  return { x: touch.clientX, y: touch.clientY };
}

export function useSpotlightTrail(circleRefs, followPointer = true) {
  const pointsRef = useRef(makeTrailPoints(NUM_TRAILS, TRAIL_HIDDEN));
  const targetRef = useRef({
    x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
    y: typeof window === 'undefined' ? 0 : window.innerHeight / 2,
  });

  useEffect(() => {
    const onMouseMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };
    const onTouchMove = (event) => {
      const point = readTouchPoint(event);
      if (point) targetRef.current = point;
    };

    let raf = 0;
    const tick = () => {
      pointsRef.current = stepTrail(
        pointsRef.current,
        targetRef.current,
        LEADER_LERP,
        FOLLOWER_LERP,
      );
      pointsRef.current.forEach((point, index) => {
        const circle = circleRefs.current[index];
        if (!circle) return;
        circle.setAttribute('cx', String(point.x));
        circle.setAttribute('cy', String(point.y));
      });
      raf = window.requestAnimationFrame(tick);
    };

    if (followPointer) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
    }
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.cancelAnimationFrame(raf);
    };
  }, [circleRefs, followPointer]);

  const setTarget = useCallback((x, y) => {
    targetRef.current = { x, y };
  }, []);

  return { setTarget };
}
