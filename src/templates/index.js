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
import { meta as ltxWorld } from './ecommerce/ltx-world/meta';
import { meta as castRender } from './3d-website/cast-render/meta';
import { meta as characterStudio } from './3d-website/3d-character-studio/meta';
import { meta as scrollTiedVideo } from './creative/scroll-tied-video/meta';
import { meta as mostarCity } from './travel/mostar-city/meta';

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
  'Ecommerce',
  '3d Website',
  'Creative',
  'Travel',
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
  ltxWorld,
  castRender,
  characterStudio,
  scrollTiedVideo,
  mostarCity,
];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id) || null;

export const categoryHasTemplates = (category) =>
  ACTIVE_TEMPLATE_CATEGORIES.includes(category);
