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
