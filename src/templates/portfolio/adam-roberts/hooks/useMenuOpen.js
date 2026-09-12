import { useCallback, useState } from 'react';

export function useMenuOpen() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  return { isOpen, openMenu, closeMenu, toggleMenu };
}
