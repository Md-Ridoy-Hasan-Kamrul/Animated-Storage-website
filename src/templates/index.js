import { CATEGORIES, categoryToSlug } from './categories';
import { meta as threeDPortfolio } from './landing-page/3d-portfolio/meta';
import { meta as promptArchive } from './landing-page/prompt/meta';
import { meta as portfolioCosmic } from './portfolio/portfolio-cosmic/meta';
import { meta as neoMuseum } from './landing-page/neo-museum/meta';
import { meta as adamRoberts } from './portfolio/adam-roberts/meta';
import { meta as lumina } from './sections/lumina/meta';
import { meta as warpFieldDefault } from './sections/warp-field-default/meta';
import { meta as heritageGrove } from './footer/heritage-grove/meta';
import { meta as velorah } from './agency/velorah/meta';
import { meta as foldcraft } from './hero/foldcraft/meta';
import { meta as ashenPress } from './hero/ashen-press/meta';
import { meta as ltxWorld } from './ecommerce/ltx-world/meta';
import { meta as castRender } from './3d-website/cast-render/meta';
import { meta as characterStudio } from './3d-website/3d-character-studio/meta';
import { meta as scrollTiedVideo } from './creative/scroll-tied-video/meta';
import { meta as mostarCity } from './travel/mostar-city/meta';
import { meta as stillmind } from './hero/stillmind/meta';
import { meta as intelligentOperations } from './agency/intelligent-operations/meta';
import { meta as interactiveDiscovery } from './hero/interactive-discovery/meta';
import { meta as nikeHover } from './features/nike-hover/meta';
import { meta as synthMode } from './fashion/synth-mode/meta';
import { meta as techForward } from './hero/tech-forward/meta';
import { meta as contactCybernetic } from './hero/contact-cybernetic/meta';
import { meta as wellnessHero } from './hero/wellness-hero/meta';
import { meta as mindBodyHealing } from './medicine/mind-body-healing/meta';
import { meta as veyraElectric } from './automative/veyra-electric/meta';
import { meta as realTimeAlerts } from './sign-in/real-time-alerts/meta';
import { meta as equilibrium } from './hero/equilibrium/meta';
import { meta as scalingPlatform } from './saas/scaling-platform/meta';
import { meta as kage } from './landing-page/kage/meta';
import { meta as sketchbook } from './landing-page/sketchbook/meta';
import { meta as sublevelStudio } from './landing-page/sublevel-studio/meta';
import { meta as livingGreen } from './hero/living-green/meta';
import { meta as completeShelf } from './landing-page/complete-shelf/meta';
import { meta as bestsellersBookShowcase } from './landing-page/bestsellers-book-showcase/meta';
import { meta as livingGreenSylvaLivingWorld } from './background/living-green-sylva-living-world/meta';
import { meta as logicCoreStructureFlow } from './background/logic-core-structure-flow/meta';
import { meta as topologyFieldStructureFlow } from './background/topology-field-structure-flow/meta';
import { meta as nebulaStructureFlow } from './background/nebula-structure-flow/meta';
import { meta as fluxVortexStructureFlow } from './background/flux-vortex-structure-flow/meta';
import { meta as japaneseTowerLandscape } from './background/japanese-tower-landscape/meta';
import { meta as chinaJapaneseTowerLandscape } from './background/china-japanese-tower-landscape/meta';
import { meta as vietnamJapaneseTowerLandscape } from './background/vietnam-japanese-tower-landscape/meta';
import { meta as thailandJapaneseTowerLandscape } from './background/thailand-japanese-tower-landscape/meta';
import { meta as turkeyJapaneseTowerLandscape } from './background/turkey-japanese-tower-landscape/meta';
import { meta as original3dPaper } from './3d-paper/original-3d-paper/meta';
import { meta as siteOfTheYear3dPaper } from './3d-paper/site-of-the-year-3d-paper/meta';
import { meta as japanese3dPaper } from './3d-paper/japanese-3d-paper/meta';
import { meta as certificate3dPaper } from './3d-paper/certificate-3d-paper/meta';

export { CATEGORIES, CATEGORY_SLUGS, categoryToSlug, slugToCategory } from './categories';

/** Categories that currently have at least one live template */
export const ACTIVE_TEMPLATE_CATEGORIES = [
  'All',
  'Landing Page',
  'Portfolio',
  'Sections',
  'Footer',
  'Agency',
  'Hero',
  'Background',
  'Features',
  'SaaS',
  'Ecommerce',
  '3d Website',
  '3D Paper',
  'Creative',
  'Travel',
  'Fashion',
  'Medicine',
  'Automative',
  'Sign in',
];

/**
 * Registry of all live templates.
 * Add new templates under src/templates/<category-slug>/<template-id>/ then import meta here.
 */
export const TEMPLATES = [
  kage,
  sketchbook,
  sublevelStudio,
  completeShelf,
  bestsellersBookShowcase,
  livingGreenSylvaLivingWorld,
  logicCoreStructureFlow,
  topologyFieldStructureFlow,
  nebulaStructureFlow,
  fluxVortexStructureFlow,
  japaneseTowerLandscape,
  chinaJapaneseTowerLandscape,
  vietnamJapaneseTowerLandscape,
  thailandJapaneseTowerLandscape,
  turkeyJapaneseTowerLandscape,
  original3dPaper,
  siteOfTheYear3dPaper,
  japanese3dPaper,
  certificate3dPaper,
  threeDPortfolio,
  promptArchive,
  portfolioCosmic,
  neoMuseum,
  adamRoberts,
  lumina,
  warpFieldDefault,
  heritageGrove,
  velorah,
  foldcraft,
  ashenPress,
  ltxWorld,
  castRender,
  characterStudio,
  scrollTiedVideo,
  mostarCity,
  stillmind,
  intelligentOperations,
  interactiveDiscovery,
  nikeHover,
  synthMode,
  techForward,
  contactCybernetic,
  wellnessHero,
  mindBodyHealing,
  veyraElectric,
  realTimeAlerts,
  equilibrium,
  scalingPlatform,
  livingGreen,
];

export const getTemplateById = (id) => TEMPLATES.find((t) => t.id === id) || null;

export const categoryHasTemplates = (category) =>
  ACTIVE_TEMPLATE_CATEGORIES.includes(category);
