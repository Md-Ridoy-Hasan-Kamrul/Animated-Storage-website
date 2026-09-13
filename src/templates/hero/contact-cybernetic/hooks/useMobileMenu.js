import { useCallback, useState } from 'react';

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMobileMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  return { isMobileMenuOpen, toggleMenu, closeMenu };
}
