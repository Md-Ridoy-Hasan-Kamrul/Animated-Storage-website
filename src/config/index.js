export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'Gairewele',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  LOGIN: '/login',
  TEMPLATE_DETAIL: '/templates/:id',
  JACK_PORTFOLIO: '/p/3d-portfolio',
  PROMPT_ARCHIVE: '/p/prompt',
  PORTFOLIO_COSMIC: '/p/portfolio-cosmic',
  NEO_MUSEUM: '/p/neo-museum',
  ADAM_ROBERTS: '/p/adam-roberts',
  LUMINA: '/p/lumina',
  HERITAGE_GROVE: '/p/heritage-grove',
  VELORAH: '/p/velorah',
  FOLDCRAFT: '/p/foldcraft',
  LTX_WORLD: '/p/ltx-world',
  CAST_RENDER: '/p/cast-render',
  CHARACTER_STUDIO: '/p/3d-character-studio',
  SCROLL_TIED_VIDEO: '/p/scroll-tied-video',
  MOSTAR_CITY: '/p/mostar-city',
  STILLMIND: '/p/stillmind',
  INTELLIGENT_OPERATIONS: '/p/intelligent-operations',
  INTERACTIVE_DISCOVERY: '/p/interactive-discovery',
  NIKE_HOVER: '/p/nike-hover',
  SYNTH_MODE: '/p/synth-mode',
  TECH_FORWARD: '/p/tech-forward',
  CONTACT_CYBERNETIC: '/p/contact-cybernetic',
  WELLNESS_HERO: '/p/wellness-hero',
  MIND_BODY_HEALING: '/p/mind-body-healing',
  VEYRA_ELECTRIC: '/p/veyra-electric',
  REAL_TIME_ALERTS: '/p/real-time-alerts',
  EQUILIBRIUM: '/p/equilibrium',
  SCALING_PLATFORM: '/p/scaling-platform',
  KAGE: '/p/kage',
  SKETCHBOOK: '/p/sketchbook',
  SUBLEVEL_STUDIO: '/p/sublevel-studio',
  LIVING_GREEN: '/p/living-green',
  COMPLETE_SHELF: '/p/complete-shelf',
  BESTSELLERS_BOOK_SHOWCASE: '/p/bestsellers-book-showcase',
  LIVING_GREEN_SYLVA_LIVING_WORLD: '/p/living-green-sylva-living-world',
  LOGIC_CORE_STRUCTURE_FLOW: '/p/logic-core-structure-flow',
  TOPOLOGY_FIELD_STRUCTURE_FLOW: '/p/topology-field-structure-flow',
  NEBULA_STRUCTURE_FLOW: '/p/nebula-structure-flow',
  FLUX_VORTEX_STRUCTURE_FLOW: '/p/flux-vortex-structure-flow',
  JAPANESE_TOWER_LANDSCAPE: '/p/japanese-tower-landscape',
  CHINA_JAPANESE_TOWER_LANDSCAPE: '/p/china-japanese-tower-landscape',
  VIETNAM_JAPANESE_TOWER_LANDSCAPE: '/p/vietnam-japanese-tower-landscape',
  THAILAND_JAPANESE_TOWER_LANDSCAPE: '/p/thailand-japanese-tower-landscape',
  TURKEY_JAPANESE_TOWER_LANDSCAPE: '/p/turkey-japanese-tower-landscape',
  ORIGINAL_3D_PAPER: '/p/original-3d-paper',
  SITE_OF_THE_YEAR_3D_PAPER: '/p/site-of-the-year-3d-paper',
  JAPANESE_3D_PAPER: '/p/japanese-3d-paper',
  CERTIFICATE_3D_PAPER: '/p/certificate-3d-paper',
  ASHEN_PRESS: '/p/ashen-press',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_EMAILS: '/admin/emails',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_MARKETPLACE_ORDERS: '/admin/marketplace-orders',
  ADMIN_CASE_STUDIES: '/admin/case-studies',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_PRICING: '/admin/pricing',
  ADMIN_MESSAGES: '/admin/messages',
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://backend.c4r.co.uk',
  VITALS_ENDPOINT: process.env.REACT_APP_VITALS_ENDPOINT || '',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || '3', 10),
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY || '1000', 10),
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: process.env.REACT_APP_SEO_TITLE || 'Gairewele',
  DEFAULT_DESCRIPTION: process.env.REACT_APP_SEO_DESCRIPTION || 'A professional React application',
  DEFAULT_KEYWORDS: (process.env.REACT_APP_SEO_KEYWORDS || 'react,webpack,tailwind').split(','),
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};

export const PERFORMANCE_BUDGETS = {
  LCP: 2500,
  FCP: 1800,
  CLS: 0.1,
  INP: 200,
  TTFB: 800,
};

export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};

export const SOCKET_CONFIG = {
  URL: process.env.REACT_APP_SOCKET_URL || API_CONFIG.BASE_URL,
};
