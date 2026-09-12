import { meta } from '../meta';
import { NEO_MUSEUM_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { CHAPTERS, MARQUEE_GIFS } from '../content';
import { DETAIL_CARD_IMAGE_COUNT } from '../constants';

describe('Neo Museum meta', () => {
  it('registers Landing Page card Neo Museum', () => {
    expect(meta.id).toBe('neo-museum');
    expect(meta.title).toBe('Neo Museum');
    expect(meta.category).toBe('Landing Page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(NEO_MUSEUM_PROMPT);
  });

  it('uses neo-museum routes', () => {
    expect(meta.detailPath).toBe('/templates/neo-museum');
    expect(meta.livePath).toBe(ROUTES.NEO_MUSEUM);
  });
});

describe('Neo Museum content', () => {
  it('has five chapters starting with Age of Dinosaurs', () => {
    expect(CHAPTERS).toHaveLength(5);
    expect(CHAPTERS[2].name).toBe('Reptiles of the Mesozoic');
  });

  it('pads gallery card images for TemplateDetail', () => {
    expect(MARQUEE_GIFS).toHaveLength(DETAIL_CARD_IMAGE_COUNT);
  });
});
