import { menuLinkDelayMs } from '../utils/menuStagger';

describe('menuLinkDelayMs', () => {
  it('staggers open delays in 60ms steps from 100ms', () => {
    expect(menuLinkDelayMs(0, true)).toBe(100);
    expect(menuLinkDelayMs(1, true)).toBe(160);
    expect(menuLinkDelayMs(5, true)).toBe(400);
  });

  it('clears delay when the menu is closed', () => {
    expect(menuLinkDelayMs(3, false)).toBe(0);
  });
});
