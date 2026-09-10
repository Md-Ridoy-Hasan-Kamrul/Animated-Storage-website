import { CATEGORIES, categoryToSlug } from './categories';
import { meta as threeDPortfolio } from './landing-page/3d-portfolio/meta';
import { meta as promptArchive } from './landing-page/prompt/meta';
import { meta as portfolioCosmic } from './landing-page/portfolio-cosmic/meta';

export { CATEGORIES, CATEGORY_SLUGS, categoryToSlug } from './categories';

/** Categories that currently have at least one live template */
export const ACTIVE_TEMPLATE_CATEGORIES = ['All', 'Landing Page'];

/**
 * Registry of all live templates.
 * Add new templates under src/templates/<category-slug>/<template-id>/ then import meta here.
 */
export const TEMPLATES = [threeDPortfolio, promptArchive, portfolioCosmic];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id) || null;

export const categoryHasTemplates = (category) =>
  ACTIVE_TEMPLATE_CATEGORIES.includes(category);
