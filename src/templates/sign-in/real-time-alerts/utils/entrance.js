import { ENTRANCE_EASE, ENTRANCE_SOFT_EASE } from '../constants';

export function easingFor(kind) {
  return kind === 'soft' ? ENTRANCE_SOFT_EASE : ENTRANCE_EASE;
}

export function entranceFrom(kind, compact) {
  if (kind === 'card') {
    return compact
      ? { opacity: 0, transform: 'translateY(14px)' }
      : { opacity: 0, transform: 'translateY(12px) scale(.988)' };
  }
  if (kind === 'headline') {
    const y = compact ? 12 : 16;
    return { opacity: 0, transform: `translateY(${y}px)`, clipPath: 'inset(100% 0 0 0)' };
  }
  if (kind === 'y10') return { opacity: 0, transform: 'translateY(10px)' };
  if (kind === 'y6') return { opacity: 0, transform: 'translateY(6px)' };
  return { opacity: 0, transform: 'translateY(8px)' };
}

export function entranceTo(kind) {
  if (kind === 'headline') {
    return { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' };
  }
  return { opacity: 1, transform: 'none' };
}
