import { animate } from 'framer-motion';

export const SECTION_IDS = {
  about: 'about',
  price: 'price',
  projects: 'projects',
  contact: 'contact',
};

/** Prompt: duration ~1.05s */
export const SCROLL_DURATION_SEC = 1.05;

/** Prompt: easing [0.25, 0.1, 0.25, 1] */
export const SCROLL_EASE = [0.25, 0.1, 0.25, 1];

let activeAnimation = null;

export const resolveSectionId = (label) => {
  const key = String(label || '').trim().toLowerCase();
  return SECTION_IDS[key] || key;
};

const readTargetY = (el, offset) =>
  el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + offset;

/**
 * Smooth navbar scroll to a section (Framer Motion animate).
 */
export const scrollToSection = (
  sectionId,
  { duration = SCROLL_DURATION_SEC, offset = 0 } = {},
) => {
  if (typeof window === 'undefined') return;

  const id = resolveSectionId(sectionId);
  const el = document.getElementById(id);
  if (!el) return;

  if (activeAnimation) {
    activeAnimation.stop();
    activeAnimation = null;
  }

  const startY = window.scrollY || window.pageYOffset;
  const targetY = readTargetY(el, offset);

  activeAnimation = animate(startY, targetY, {
    duration,
    ease: SCROLL_EASE,
    onUpdate: (value) => {
      window.scrollTo(0, value);
    },
    onComplete: () => {
      const latest = document.getElementById(id);
      if (latest) {
        window.scrollTo({ top: readTargetY(latest, offset), behavior: 'auto' });
      }
      activeAnimation = null;
    },
  });
};
