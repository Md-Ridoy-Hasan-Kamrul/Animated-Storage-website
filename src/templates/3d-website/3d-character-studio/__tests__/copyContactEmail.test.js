import { copyContactEmail } from '../utils/copyContactEmail';
import { CONTACT_EMAIL } from '../constants';

describe('copyContactEmail', () => {
  it('writes the contact email through the clipboard API', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    await copyContactEmail();
    expect(writeText).toHaveBeenCalledWith(CONTACT_EMAIL);
  });

  it('rejects when the clipboard API is missing', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });
    await expect(copyContactEmail()).rejects.toThrow('Clipboard unavailable');
  });
});
