import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CUES,
  DRIFT_PX,
  HASH_PROGRESS,
  PANEL_POINTER_OPACITY,
  READY_STATE_HAVE_CURRENT_DATA,
  SEEK_EASE,
  SEEK_GAP_MIN,
} from '../constants';
import {
  easeSeek,
  getPanelPaint,
  getSeekTarget,
  hashToProgress,
  readProgress,
} from '../utils/scrubMath';

export function useScrollScrub() {
  const clipRef = useRef(null);
  const meterRef = useRef(null);
  const panelRefs = useRef([]);
  const progressRef = useRef(0);
  const seekToRef = useRef(0);
  const seekAtRef = useRef(0);
  const durationRef = useRef(0);
  const readyRef = useRef(false);
  const [booted, setBooted] = useState(false);

  const readScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressRef.current = readProgress(window.pageYOffset, max);
    if (durationRef.current) {
      seekToRef.current = getSeekTarget(progressRef.current, durationRef.current);
    }
  }, []);

  const paint = useCallback(() => {
    if (meterRef.current) {
      meterRef.current.style.transform = `scaleX(${progressRef.current})`;
    }
    CUES.forEach((cue, index) => {
      const node = panelRefs.current[index];
      if (!node) return;
      const { opacity, y } = getPanelPaint(progressRef.current, cue, DRIFT_PX);
      node.style.opacity = String(opacity);
      node.style.transform = `translate3d(0,${y}px,0)`;
      node.style.pointerEvents = opacity > PANEL_POINTER_OPACITY ? 'auto' : 'none';
    });
  }, []);

  const onDuration = useCallback(
    (duration) => {
      durationRef.current = duration;
      readScroll();
      seekAtRef.current = seekToRef.current;
      const clip = clipRef.current;
      if (clip) {
        try {
          clip.currentTime = seekAtRef.current;
        } catch {
          /* ignore unseekable */
        }
      }
    },
    [readScroll],
  );

  const onReady = useCallback(() => {
    readyRef.current = true;
    readScroll();
    seekAtRef.current = seekToRef.current;
    setBooted(true);
  }, [readScroll]);

  const scrollToHash = useCallback(
    (hash) => {
      const target = hashToProgress(hash, HASH_PROGRESS);
      if (target == null) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, target * max);
      readScroll();
      paint();
    },
    [paint, readScroll],
  );

  useEffect(() => {
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);
    readScroll();
    paint();

    let raf = 0;
    const frame = () => {
      const clip = clipRef.current;
      if (readyRef.current && durationRef.current && clip) {
        const prev = seekAtRef.current;
        seekAtRef.current = easeSeek(
          prev,
          seekToRef.current,
          SEEK_EASE,
          SEEK_GAP_MIN,
        );
        if (
          seekAtRef.current !== prev &&
          clip.readyState >= READY_STATE_HAVE_CURRENT_DATA &&
          !clip.seeking
        ) {
          try {
            clip.currentTime = seekAtRef.current;
          } catch {
            /* ignore */
          }
        }
      }
      paint();
      raf = window.requestAnimationFrame(frame);
    };
    raf = window.requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [paint, readScroll]);

  return {
    clipRef,
    meterRef,
    panelRefs,
    booted,
    onDuration,
    onReady,
    scrollToHash,
  };
}
