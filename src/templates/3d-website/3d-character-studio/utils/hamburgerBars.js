export const HAMBURGER_BAR_BASE = 'block h-[2px] w-6 bg-white transition duration-300';

const OPEN_MODIFIERS = {
  top: 'translate-y-[7px] rotate-45',
  mid: 'opacity-0',
  bottom: '-translate-y-[7px] -rotate-45',
};

export function hamburgerBarClass(isOpen, slot) {
  const openClass = isOpen ? OPEN_MODIFIERS[slot] : '';
  return [HAMBURGER_BAR_BASE, openClass].filter(Boolean).join(' ');
}
