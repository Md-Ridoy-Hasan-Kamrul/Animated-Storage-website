import { commitHeldFrame } from '../utils/commitHeldFrame';

describe('commitHeldFrame', () => {
  it('pauses the clip and never seeks backward', () => {
    const video = { currentTime: 2.02, pause: jest.fn() };
    commitHeldFrame(video);
    expect(video.pause).toHaveBeenCalled();
    expect(video.currentTime).toBe(2.02);
  });

  it('ignores a missing element', () => {
    expect(() => commitHeldFrame(null)).not.toThrow();
  });
});
