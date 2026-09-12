import {
  isBranchControlDisabled,
  isBranchControlHidden,
} from '../utils/controllerAccess';
import { parkVideoAtStart } from '../utils/parkVideoAtStart';
import { READY_STATE_HAVE_CURRENT_DATA } from '../constants';

describe('controller access', () => {
  it('disables other branches while selected and all branches while collapsed', () => {
    expect(
      isBranchControlDisabled({
        locked: false,
        ready: true,
        selected: true,
        collapsed: false,
        isActive: false,
      }),
    ).toBe(true);
    expect(
      isBranchControlDisabled({
        locked: false,
        ready: true,
        selected: true,
        collapsed: false,
        isActive: true,
      }),
    ).toBe(false);
    expect(
      isBranchControlDisabled({
        locked: false,
        ready: true,
        selected: false,
        collapsed: true,
        isActive: true,
      }),
    ).toBe(true);
  });

  it('hides inactive controls from the tab order in selected or collapsed modes', () => {
    expect(
      isBranchControlHidden({ selected: true, collapsed: false, isActive: false }),
    ).toBe(true);
    expect(
      isBranchControlHidden({ selected: false, collapsed: false, isActive: false }),
    ).toBe(false);
    expect(
      isBranchControlHidden({
        selected: false,
        collapsed: false,
        reversing: true,
        isActive: false,
      }),
    ).toBe(true);
  });
});

describe('parkVideoAtStart', () => {
  it('parks a decoded clip at frame 0 and rejects unread media', () => {
    const video = { readyState: READY_STATE_HAVE_CURRENT_DATA, currentTime: 1, pause: jest.fn() };
    expect(parkVideoAtStart(video)).toBe(true);
    expect(video.pause).toHaveBeenCalled();
    expect(video.currentTime).toBe(0);
    expect(parkVideoAtStart({ readyState: 1, pause: jest.fn() })).toBe(false);
  });
});
