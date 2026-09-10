import { animate } from 'framer-motion';

const SECTION_IDS = {
  about: 'about',
  price: 'price',
  projects: 'projects',
  contact: 'contact',
};

let activeAnimation = null;

export const resolveSectionId = (label) => {
  const key = String(label || '').trim().toLowerCase();
  return SECTION_IDS[key] || key;
};

const readTargetY = (el, offset) =>
  el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + offset;

/**
 * Smooth navbar scroll to section. Cancels in-flight tweens and
 * corrects landing position after sticky layout settles.
 */
export const scrollToSection = (sectionId, { duration = 0.95, offset = 0 } = {}) => {
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
    ease: [0.22, 0.61, 0.36, 1],
    onUpdate: (value) => {
      window.scrollTo(0, value);
    },
    onComplete: () => {
      // Sticky / lazy layout can shift — snap once more to the real target
      const latest = document.getElementById(id);
      if (latest) {
        window.scrollTo({ top: readTargetY(latest, offset), behavior: 'auto' });
      }
      activeAnimation = null;
    },
  });
};
