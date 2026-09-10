import {
  resolveSectionId,
  SCROLL_DURATION_SEC,
  SCROLL_EASE,
  SECTION_IDS,
} from '../utils/scrollToSection';

describe('scrollToSection utils (3D Portfolio 2.0)', () => {
  it('maps nav labels to section ids', () => {
    expect(resolveSectionId('About')).toBe('about');
    expect(resolveSectionId('Price')).toBe('price');
    expect(resolveSectionId('Projects')).toBe('projects');
    expect(resolveSectionId('Contact')).toBe('contact');
  });

  it('falls back to lowercased raw id', () => {
    expect(resolveSectionId('about')).toBe('about');
  });

  it('uses prompt duration and easing constants', () => {
    expect(SCROLL_DURATION_SEC).toBe(1.05);
    expect(SCROLL_EASE).toEqual([0.25, 0.1, 0.25, 1]);
  });

  it('exposes the four required section ids', () => {
    expect(SECTION_IDS).toEqual({
      about: 'about',
      price: 'price',
      projects: 'projects',
      contact: 'contact',
    });
  });
});
