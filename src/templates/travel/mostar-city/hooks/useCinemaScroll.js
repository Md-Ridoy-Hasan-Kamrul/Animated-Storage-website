import { useLayoutEffect, useRef, useState } from 'react';
import { LERP_MOUSE, LERP_SCROLL, SNAP_SCROLL, STAGE_EXTRA_PX } from '../constants';
import { lerp, resolveCinemaScroll, shouldKeepTicking } from '../utils/cinemaMath';
import { applyCinemaVars, buildCinemaVars } from '../utils/cinemaVars';

function readWindowScroll() {
  const scrolling = document.scrollingElement || document.documentElement;
  return scrolling.scrollTop || window.scrollY || 0;
}

export function useCinemaScroll(rootRef, sectionRef, alwaysTick = false) {
  const [sightsReady, setSightsReady] = useState(false);
  const stateRef = useRef({
    targetMouseX: 0,
    targetMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    targetScroll: 0,
    smoothScroll: 0,
    initialized: false,
    rafPending: false,
  });

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = stateRef.current;
    let raf = 0;

    const requestTick = () => {
      if (state.rafPending) return;
      state.rafPending = true;
      raf = window.requestAnimationFrame(update);
    };

    const update = () => {
      state.rafPending = false;
      const section = sectionRef.current;
      const root = rootRef.current;
      if (!section || !root) {
        requestTick();
        return;
      }

      const rect = section.getBoundingClientRect();
      state.targetScroll = resolveCinemaScroll({
        sectionTop: rect.top,
        sectionHeight: section.offsetHeight,
        innerHeight: window.innerHeight,
        windowScroll: readWindowScroll(),
        extraPx: STAGE_EXTRA_PX,
      });

      if (!state.initialized || reduceMotion.matches) {
        state.smoothScroll = state.targetScroll;
        state.initialized = true;
      } else {
        state.smoothScroll = lerp(state.smoothScroll, state.targetScroll, LERP_SCROLL);
      }
      if (Math.abs(state.smoothScroll - state.targetScroll) < SNAP_SCROLL) {
        state.smoothScroll = state.targetScroll;
      }

      state.mouseX = lerp(state.mouseX, state.targetMouseX, LERP_MOUSE);
      state.mouseY = lerp(state.mouseY, state.targetMouseY, LERP_MOUSE);

      const vars = buildCinemaVars({
        smoothScroll: state.smoothScroll,
        mouseX: state.mouseX,
        mouseY: state.mouseY,
        innerHeight: window.innerHeight,
        reduceMotion: reduceMotion.matches,
      });
      applyCinemaVars(root, vars);
      setSightsReady((ready) => (ready === vars.sightsReady ? ready : vars.sightsReady));

      if (
        alwaysTick ||
        shouldKeepTicking(
          state.smoothScroll,
          state.targetScroll,
          state.mouseX,
          state.targetMouseX,
          state.mouseY,
          state.targetMouseY,
        )
      ) {
        requestTick();
      }
    };

    const onScroll = () => requestTick();
    const onResize = () => requestTick();
    const onPointer = (event) => {
      state.targetMouseX = event.clientX / window.innerWidth - 0.5;
      state.targetMouseY = event.clientY / window.innerHeight - 0.5;
      requestTick();
    };
    const onWheel = () => requestTick();

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    requestTick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('wheel', onWheel);
      window.cancelAnimationFrame(raf);
      state.rafPending = false;
    };
  }, [alwaysTick, rootRef, sectionRef]);

  return sightsReady;
}
