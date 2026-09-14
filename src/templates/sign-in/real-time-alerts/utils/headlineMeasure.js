import { HEADLINE_MEASURE_COPY } from '../constants';

export function measureHeadline(heroEl) {
  if (!heroEl || typeof document === 'undefined') return 0;
  const source = heroEl.querySelector('#hl1');
  const probe = document.createElement('span');
  probe.textContent = HEADLINE_MEASURE_COPY;
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.whiteSpace = 'nowrap';
  probe.style.pointerEvents = 'none';
  if (source) {
    const styles = window.getComputedStyle(source);
    probe.style.fontFamily = styles.fontFamily;
    probe.style.fontSize = styles.fontSize;
    probe.style.letterSpacing = styles.letterSpacing;
    probe.style.wordSpacing = styles.wordSpacing;
    probe.style.fontVariationSettings = styles.fontVariationSettings;
  }
  document.body.appendChild(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return width;
}
