import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SIGHTS } from '../content';
import {
  buildSightCopies,
  initialActiveSight,
  moveActiveSight,
  needsSightJump,
  normalizeActiveSight,
  sightShiftPx,
} from '../utils/sightSlider';

export function useSightSlider(rootRef) {
  const trackRef = useRef(null);
  const copies = useMemo(() => buildSightCopies(SIGHTS), []);
  const originalCount = SIGHTS.length;
  const [activeSight, setActiveSight] = useState(() => initialActiveSight(originalCount));
  const [jumping, setJumping] = useState(false);

  const writeShift = useCallback(
    (index, instant) => {
      const track = trackRef.current;
      const root = rootRef.current;
      const card = track?.children?.[0];
      if (!track || !root || !card) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '0') || 0;
      root.style.setProperty('--sights-shift', `${sightShiftPx(card.offsetWidth, gap, index)}px`);
      if (instant) {
        setJumping(true);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setJumping(false));
        });
      }
    },
    [rootRef],
  );

  const selectSight = useCallback((index) => {
    if (!Number.isFinite(index)) return;
    setActiveSight(index);
  }, []);

  const moveSight = useCallback((dir) => {
    setActiveSight((current) => moveActiveSight(current, dir));
  }, []);

  const goPrev = useCallback(() => moveSight(-1), [moveSight]);
  const goNext = useCallback(() => moveSight(1), [moveSight]);

  const normalize = useCallback(() => {
    setActiveSight((current) => {
      if (!needsSightJump(current, originalCount)) return current;
      const next = normalizeActiveSight(current, originalCount);
      writeShift(next, true);
      return next;
    });
  }, [originalCount, writeShift]);

  useEffect(() => {
    writeShift(activeSight, false);
  }, [activeSight, writeShift]);

  useEffect(() => {
    const onResize = () => writeShift(activeSight, false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeSight, writeShift]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onEnd = (event) => {
      if (event.propertyName && event.propertyName !== 'transform') return;
      normalize();
    };
    track.addEventListener('transitionend', onEnd);
    return () => track.removeEventListener('transitionend', onEnd);
  }, [normalize]);

  return {
    copies,
    activeSight,
    jumping,
    trackRef,
    selectSight,
    moveSight,
    goPrev,
    goNext,
    normalize,
  };
}
