import { CATEGORIES, categoryToSlug } from './categories';
import { meta as threeDPortfolio } from './landing-page/3d-portfolio/meta';
import { meta as promptArchive } from './landing-page/prompt/meta';
import { meta as portfolioCosmic } from './portfolio/portfolio-cosmic/meta';
import { meta as neoMuseum } from './landing-page/neo-museum/meta';
import { meta as adamRoberts } from './portfolio/adam-roberts/meta';
import { meta as lumina } from './sections/lumina/meta';
import { meta as heritageGrove } from './footer/heritage-grove/meta';
import { meta as velorah } from './agency/velorah/meta';
import { meta as foldcraft } from './hero/foldcraft/meta';

export { CATEGORIES, CATEGORY_SLUGS, categoryToSlug } from './categories';

/** Categories that currently have at least one live template */
export const ACTIVE_TEMPLATE_CATEGORIES = [
  'All',
  'Landing Page',
  'Portfolio',
  'Sections',
  'Footer',
  'Agency',
  'Hero',
];

/**
 * Registry of all live templates.
 * Add new templates under src/templates/<category-slug>/<template-id>/ then import meta here.
 */
export const TEMPLATES = [
  threeDPortfolio,
  promptArchive,
  portfolioCosmic,
  neoMuseum,
  adamRoberts,
  lumina,
  heritageGrove,
  velorah,
  foldcraft,
];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id) || null;

export const categoryHasTemplates = (category) =>
  ACTIVE_TEMPLATE_CATEGORIES.includes(category);
