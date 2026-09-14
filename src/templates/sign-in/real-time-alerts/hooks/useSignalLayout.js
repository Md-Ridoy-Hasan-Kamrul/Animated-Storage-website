import { useEffect } from 'react';
import { LAND_MQ, MODE_PHONE, MODE_TABPORT, PORT_MQ } from '../constants';
import { clearInline, resolveLayoutMode } from '../utils/layoutMode';
import { assignStyles, assignVars, landPass, phonePass, syncBodyMode, tabportPass } from '../utils/layoutPass';
import { measureHeadline } from '../utils/headlineMeasure';

export function useSignalLayout({ preview, photoRef, paneRef, cardRef, cardInRef, heroRef, hlWrapRef, rootRef }) {
  useEffect(() => {
    const mqLand = window.matchMedia(LAND_MQ);
    const mqPort = window.matchMedia(PORT_MQ);

    const layout = () => {
      const nodes = [photoRef.current, paneRef.current, cardRef.current, cardInRef.current, heroRef.current];
      clearInline(nodes);
      if (hlWrapRef.current) hlWrapRef.current.style.cssText = '';
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mode = resolveLayoutMode(vw, vh, { framed: preview });
      let pass = landPass(vw, vh);
      if (mode === MODE_PHONE) pass = phonePass();
      else if (mode === MODE_TABPORT) pass = tabportPass(vw, vh, measureHeadline(heroRef.current));
      assignStyles(photoRef.current, pass.photo);
      assignStyles(paneRef.current, pass.pane);
      assignStyles(cardRef.current, pass.card);
      assignStyles(cardInRef.current, pass.cardIn);
      assignStyles(heroRef.current, pass.hero);
      assignVars(rootRef.current, pass.vars);
      if (hlWrapRef.current && pass.vars['--hl-wrap']) {
        hlWrapRef.current.style.width = pass.vars['--hl-wrap'];
      }
      syncBodyMode(mode);
    };

    layout();
    window.addEventListener('resize', layout, { passive: true });
    window.addEventListener('orientationchange', layout);
    mqLand.addEventListener('change', layout);
    mqPort.addEventListener('change', layout);
    const fonts = document.fonts?.ready;
    if (fonts && typeof fonts.then === 'function') fonts.then(layout);

    return () => {
      window.removeEventListener('resize', layout);
      window.removeEventListener('orientationchange', layout);
      mqLand.removeEventListener('change', layout);
      mqPort.removeEventListener('change', layout);
    };
  }, [preview, photoRef, paneRef, cardRef, cardInRef, heroRef, hlWrapRef, rootRef]);
}
