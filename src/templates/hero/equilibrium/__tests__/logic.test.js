import { NAV_ITEM_ACTIVE, NAV_ITEM_IDLE, NAV_LINKS } from '../constants';
import { hasDropdown, isActiveNav, navButtonClass } from '../utils/navItems';

describe('Equilibrium nav contract', () => {
  it('marks Home active and Wellness as a dropdown', () => {
    expect(NAV_LINKS).toHaveLength(4);
    expect(NAV_LINKS.map((item) => item.label)).toEqual(['Home', 'Wellness', 'Routine', 'Our Team']);
    expect(isActiveNav(NAV_LINKS[0])).toBe(true);
    expect(hasDropdown(NAV_LINKS[1])).toBe(true);
    expect(hasDropdown(NAV_LINKS[2])).toBe(false);
    expect(navButtonClass(NAV_LINKS[0])).toContain(NAV_ITEM_ACTIVE);
    expect(navButtonClass(NAV_LINKS[2])).toContain(NAV_ITEM_IDLE);
  });
});
