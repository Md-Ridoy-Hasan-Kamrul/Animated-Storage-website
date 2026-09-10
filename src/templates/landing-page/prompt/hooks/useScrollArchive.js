import { useEffect, useRef, useState } from 'react';
import { CIRCLE_SYMBOLS } from '../content';
import {
  SYMBOL_THROTTLE_MS,
  BREAKPOINT_DESKTOP,
  OUTRO_OFFSET_DESKTOP,
  OUTRO_OFFSET_MOBILE,
} from '../constants';
import { computeSpacerHeight } from '../utils/videoScrub';
import { computeCardScale, getCardTransformOrigin } from '../utils/cardScale';
import { buildLayout, resolveGalleryColumns } from '../utils/buildLayout';

/**
 * RAF scroll phases: panel slide, gallery translate, card scales, outro.
 */
export function useScrollArchive({ imageCount }) {
  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const footerRef = useRef(null);
  const buyRef = useRef(null);
  const infoRef = useRef(null);
  const symbolRef = useRef(null);
  const spacerRef = useRef(null);

  const [cols, setCols] = useState(4);
  const layout = buildLayout(imageCount, cols);

  useEffect(() => {
    const syncCols = () => setCols(resolveGalleryColumns(window.innerWidth));
    syncCols();
    window.addEventListener('resize', syncCols);
    return () => window.removeEventListener('resize', syncCols);
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastSymbolAt = 0;

    const tick = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const wrap = wrapRef.current;
      const panel = panelRef.current;
      const spacer = spacerRef.current;

      if (wrap && spacer) {
        const maxScroll = Math.max(0, wrap.scrollHeight - vh);
        const nextHeight = computeSpacerHeight(vh, wrap.scrollHeight);
        if (Math.abs((parseFloat(spacer.style.height) || 0) - nextHeight) > 1) {
          spacer.style.height = `${nextHeight}px`;
        }

        const panelY = Math.max(0, vh - scrollY);
        if (panel) {
          panel.style.transform = `translateY(${panelY}px)`;
        }

        if (scrollY > vh) {
          wrap.style.transform = `translateY(${-(scrollY - vh)}px)`;
        } else {
          wrap.style.transform = 'translateY(0px)';
        }

        const cards = gridRef.current?.querySelectorAll('.bp-card') || [];
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const scale = computeCardScale(rect.top, rect.bottom, vh);
          card.style.transform = `scale(${scale})`;
        });

        const outroStart = vh + maxScroll;
        const outroRange = Math.max(1, vh - 100);
        const outroProgress =
          scrollY > outroStart ? Math.min(1, (scrollY - outroStart) / outroRange) : 0;

        if (overlayRef.current) overlayRef.current.style.opacity = String(outroProgress);
        if (footerRef.current) footerRef.current.style.opacity = String(outroProgress);
        if (buyRef.current) buyRef.current.style.transform = `scale(${outroProgress})`;

        const outroOffset =
          window.innerWidth >= BREAKPOINT_DESKTOP
            ? OUTRO_OFFSET_DESKTOP
            : OUTRO_OFFSET_MOBILE;
        if (infoRef.current) {
          infoRef.current.style.transform = `translateY(${-outroProgress * outroOffset}px)`;
        }

        if (
          scrollY > 2 &&
          symbolRef.current &&
          performance.now() - lastSymbolAt > SYMBOL_THROTTLE_MS
        ) {
          lastSymbolAt = performance.now();
          const next =
            CIRCLE_SYMBOLS[Math.floor(Math.random() * CIRCLE_SYMBOLS.length)];
          symbolRef.current.textContent = next;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layout]);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-col]') || [];
    cards.forEach((card) => {
      const col = Number(card.getAttribute('data-col') || 0);
      card.style.transformOrigin = getCardTransformOrigin(col, cols);
    });
  }, [layout, cols]);

  return {
    layout,
    cols,
    wrapRef,
    panelRef,
    gridRef,
    overlayRef,
    footerRef,
    buyRef,
    infoRef,
    symbolRef,
    spacerRef,
  };
}
