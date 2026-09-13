import { withNavSeparators } from '../utils/navCopy';
import { hamburgerBarClass } from '../utils/hamburgerBars';
import { idFromHref } from '../utils/sectionId';
import { NAV_LINKS, NAV_SEPARATOR } from '../constants';

describe('nav copy', () => {
  it('prefixes every link after the first with a comma separator', () => {
    const items = withNavSeparators(NAV_LINKS);
    expect(items.map((item) => item.prefix)).toEqual(['', NAV_SEPARATOR, NAV_SEPARATOR, NAV_SEPARATOR]);
    expect(items.map((item) => item.label)).toEqual(['Labs', 'Studio', 'Openings', 'Shop']);
  });
});

describe('section ids', () => {
  it('strips the hash prefix from in-page hrefs', () => {
    expect(idFromHref('#labs')).toBe('labs');
    expect(idFromHref('contact')).toBe('contact');
  });
});

describe('hamburger bars', () => {
  it('applies the closed and open transform classes from the prompt', () => {
    expect(hamburgerBarClass(false, 'top')).toContain('w-6');
    expect(hamburgerBarClass(false, 'top')).not.toContain('rotate-45');
    expect(hamburgerBarClass(true, 'top')).toContain('translate-y-[7px] rotate-45');
    expect(hamburgerBarClass(true, 'mid')).toContain('opacity-0');
    expect(hamburgerBarClass(true, 'bottom')).toContain('-translate-y-[7px] -rotate-45');
  });
});
