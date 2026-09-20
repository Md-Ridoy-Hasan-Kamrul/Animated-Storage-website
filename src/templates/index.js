import { CATEGORIES, categoryToSlug } from './categories';
import { meta as threeDPortfolio } from './landing-page/3d-portfolio/meta';
import { meta as promptArchive } from './landing-page/prompt/meta';
import { meta as portfolioCosmic } from './portfolio/portfolio-cosmic/meta';
import { meta as neoMuseum } from './landing-page/neo-museum/meta';
import { meta as adamRoberts } from './portfolio/adam-roberts/meta';
import { meta as lumina } from './sections/lumina/meta';
import { meta as warpFieldDefault } from './sections/warp-field-default/meta';
import { meta as warpFieldLetterStorm } from './sections/warp-field-letter-storm/meta';
import { meta as warpFieldKeycapDrift } from './sections/warp-field-keycap-drift/meta';
import { meta as warpFieldHyperspace } from './sections/warp-field-hyperspace/meta';
import { meta as heritageGrove } from './footer/heritage-grove/meta';
import { meta as velorah } from './agency/velorah/meta';
import { meta as foldcraft } from './hero/foldcraft/meta';
import { meta as ashenPress } from './hero/ashen-press/meta';
import { meta as ltxWorld } from './ecommerce/ltx-world/meta';
import { meta as castRender } from './3d-website/cast-render/meta';
import { meta as characterStudio } from './3d-website/3d-character-studio/meta';
import { meta as wovenCloth } from './3d-website/woven-cloth/meta';
import { meta as wovenClothIridescent } from './3d-website/woven-cloth-iridescent/meta';
import { meta as wovenClothAtelier } from './3d-website/woven-cloth-atelier/meta';
import { meta as wovenClothWashi } from './3d-website/woven-cloth-washi/meta';
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
import { meta as overrideGridPredictiveArc } from './background/override-grid-predictive-arc/meta';
import { meta as liquidForm } from './background/liquid-form/meta';
import { meta as terminalCrt } from './background/terminal-crt/meta';
import { meta as cinematicCrt } from './background/cinematic-crt/meta';
import { meta as blueScreenCrt } from './background/blue-screen-crt/meta';
import { meta as globe } from './background/globe/meta';
import { meta as sparkBadge } from './background/spark-badge/meta';
import { meta as elements } from './background/elements/meta';
import { meta as generativeTreeElements } from './background/generative-tree-elements/meta';
import { meta as constellationField } from './background/constellation-field/meta';
import { meta as particleDriftConstellationField } from './background/particle-drift-constellation-field/meta';
import { meta as gatewayFlowConstellationField } from './background/gateway-flow-constellation-field/meta';
import { meta as interfaceLinesConstellationField } from './background/interface-lines-constellation-field/meta';
import { meta as cloudFieldPortalField } from './background/cloud-field-portal-field/meta';
import { meta as flowFieldPortalField } from './background/flow-field-portal-field/meta';
import { meta as matrixJunctionLaser } from './background/matrix-junction-laser/meta';
import { meta as atmosphericBladeLaser } from './background/atmospheric-blade-laser/meta';
import { meta as vanishingArrayLaser } from './background/vanishing-array-laser/meta';
import { meta as rectangleButtons } from './button/rectangle-buttons/meta';
import { meta as launchButtonRectangleButtons } from './button/launch-button-rectangle-buttons/meta';
import { meta as dotBorderButtonRectangleButtons } from './button/dot-border-button-rectangle-buttons/meta';
import { meta as floatingDotsCtaRectangleButtons } from './button/floating-dots-cta-rectangle-buttons/meta';
import { meta as slidingTextCtaRectangleButtons } from './button/sliding-text-cta-rectangle-buttons/meta';
import { meta as gradientBeamCtaRectangleButtons } from './button/gradient-beam-cta-rectangle-buttons/meta';
import { meta as gradientPillButtonRectangleButtons } from './button/gradient-pill-button-rectangle-buttons/meta';
import { meta as generateButtonRectangleButtons } from './button/generate-button-rectangle-buttons/meta';
import { meta as glassmorphismCtaRectangleButtons } from './button/glassmorphism-cta-rectangle-buttons/meta';
import { meta as spinningBorderButtonRectangleButtons } from './button/spinning-border-button-rectangle-buttons/meta';
import { meta as gradientCtaRectangleButtons } from './button/gradient-cta-rectangle-buttons/meta';
import { meta as lumenCtaRectangleButtons } from './button/lumen-cta-rectangle-buttons/meta';
import { meta as trochilSignalRectangleButtons } from './button/trochil-signal-rectangle-buttons/meta';
import { meta as tideformOutlineRectangleButtons } from './button/tideform-outline-rectangle-buttons/meta';
import { meta as meridianKeycapPrimaryRectangleButtons } from './button/meridian-keycap-primary-rectangle-buttons/meta';
import { meta as meridianKeycapSecondaryRectangleButtons } from './button/meridian-keycap-secondary-rectangle-buttons/meta';
import { meta as halvorsenArrowPillRectangleButtons } from './button/halvorsen-arrow-pill-rectangle-buttons/meta';
import { meta as emberKeycapRectangleButtons } from './button/ember-keycap-rectangle-buttons/meta';
import { meta as bloomOutlineButtonRectangleButtons } from './button/bloom-outline-button-rectangle-buttons/meta';
import { meta as playCircleLiquidMetalButton } from './button/play-circle-liquid-metal-button/meta';
import { meta as signUpPillLiquidMetalButton } from './button/sign-up-pill-liquid-metal-button/meta';
import { meta as liquidOrbLiquidMetalButton } from './button/liquid-orb-liquid-metal-button/meta';
import { meta as starPortal } from './button/star-portal/meta';
import { meta as ignitionButton } from './button/ignition-button/meta';
import { meta as inductionButton } from './button/induction-button/meta';
import { meta as plasmaButton } from './button/plasma-button/meta';
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
  'Button',
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
  overrideGridPredictiveArc,
  liquidForm,
  terminalCrt,
  cinematicCrt,
  blueScreenCrt,
  globe,
  sparkBadge,
  elements,
  generativeTreeElements,
  constellationField,
  particleDriftConstellationField,
  gatewayFlowConstellationField,
  interfaceLinesConstellationField,
  cloudFieldPortalField,
  flowFieldPortalField,
  matrixJunctionLaser,
  atmosphericBladeLaser,
  vanishingArrayLaser,
  rectangleButtons,
  launchButtonRectangleButtons,
  dotBorderButtonRectangleButtons,
  floatingDotsCtaRectangleButtons,
  slidingTextCtaRectangleButtons,
  gradientBeamCtaRectangleButtons,
  gradientPillButtonRectangleButtons,
  generateButtonRectangleButtons,
  glassmorphismCtaRectangleButtons,
  spinningBorderButtonRectangleButtons,
  gradientCtaRectangleButtons,
  lumenCtaRectangleButtons,
  trochilSignalRectangleButtons,
  tideformOutlineRectangleButtons,
  meridianKeycapPrimaryRectangleButtons,
  meridianKeycapSecondaryRectangleButtons,
  halvorsenArrowPillRectangleButtons,
  emberKeycapRectangleButtons,
  bloomOutlineButtonRectangleButtons,
  playCircleLiquidMetalButton,
  signUpPillLiquidMetalButton,
  liquidOrbLiquidMetalButton,
  starPortal,
  ignitionButton,
  inductionButton,
  plasmaButton,
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
  warpFieldLetterStorm,
  warpFieldKeycapDrift,
  warpFieldHyperspace,
  heritageGrove,
  velorah,
  foldcraft,
  ashenPress,
  ltxWorld,
  castRender,
  characterStudio,
  wovenCloth,
  wovenClothIridescent,
  wovenClothAtelier,
  wovenClothWashi,
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
