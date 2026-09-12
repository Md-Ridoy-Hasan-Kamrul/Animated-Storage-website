import { meta } from '../meta';
import { PROMPT_ARCHIVE_PROMPT } from '../prompt';

describe('Prompt archive meta', () => {
  it('registers Landing Page card Prompt', () => {
    expect(meta.id).toBe('prompt');
    expect(meta.title).toBe('Prompt');
    expect(meta.category).toBe('Landing Page');
    expect(meta.height).toBe('h-[272px]');
    expect(meta.likes).toBe(988);
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(PROMPT_ARCHIVE_PROMPT);
  });

  it('uses prompt routes', () => {
    expect(meta.detailPath).toBe('/templates/prompt');
    expect(meta.livePath).toBe('/p/prompt');
  });
});
