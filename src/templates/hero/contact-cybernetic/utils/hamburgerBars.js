export const HAMBURGER_BAR_BASE = 'block w-6 h-[2px] bg-black transition-all duration-300';

const OPEN_MODIFIERS = {
  top: 'rotate-45 translate-y-[7px]',
  mid: 'opacity-0',
  bottom: '-rotate-45 -translate-y-[7px]',
};

export function hamburgerBarClass(isOpen, slot) {
  const openClass = isOpen ? OPEN_MODIFIERS[slot] : '';
  return [HAMBURGER_BAR_BASE, openClass].filter(Boolean).join(' ');
}
