import { meta } from '../meta';
import { JACK_3D_PROMPT } from '../prompt';

describe('3D Portfolio 2.0 meta', () => {
  it('registers as Landing Page gallery template 2.0', () => {
    expect(meta.id).toBe('3d-portfolio-2');
    expect(meta.title).toBe('3D Portfolio 2.0');
    expect(meta.category).toBe('Landing Page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('keeps copy prompt identical to stored prompt export', () => {
    expect(meta.fullPrompt).toBe(JACK_3D_PROMPT);
  });

  it('points detail and live routes at the 2.0 paths', () => {
    expect(meta.detailPath).toBe('/templates/3d-portfolio-2');
    expect(meta.livePath).toBe('/p/3d-portfolio-2');
  });
});
