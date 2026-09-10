import { meta } from '../meta';
import { PORTFOLIO_COSMIC_PROMPT } from '../prompt';
import { ROUTES } from '../../../../config';
import { bentoColSpan } from '../utils/cycleIndex';
import { PROJECTS } from '../content';

describe('Portfolio Cosmic meta', () => {
  it('registers Landing Page card Portfolio Cosmic', () => {
    expect(meta.id).toBe('portfolio-cosmic');
    expect(meta.title).toBe('Portfolio Cosmic');
    expect(meta.category).toBe('Landing Page');
    expect(meta.height).toBe('h-[272px]');
  });

  it('binds copy prompt to prompt.js export', () => {
    expect(meta.fullPrompt).toBe(PORTFOLIO_COSMIC_PROMPT);
  });

  it('uses portfolio-cosmic routes', () => {
    expect(meta.detailPath).toBe('/templates/portfolio-cosmic');
    expect(meta.livePath).toBe(ROUTES.PORTFOLIO_COSMIC);
  });
});

describe('Portfolio Cosmic content', () => {
  it('has four projects with bento spans 7/5/5/7', () => {
    expect(PROJECTS).toHaveLength(4);
    expect(PROJECTS.map((_, i) => bentoColSpan(i))).toEqual([7, 5, 5, 7]);
  });
});
