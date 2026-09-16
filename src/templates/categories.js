/**
 * Tab labels (filter bar) — keep order stable.
 * Folder map: each label (except All) → src/templates/<slug>/
 */
export const CATEGORIES = [
  'All',
  'Landing Page',
  'Apps',
  'Sections',
  'Footer',
  'Hero',
  'Background',
  'Features',
  'SaaS',
  'Agency',
  'AI',
  'Portfolio',
  'Technology',
  'Travel',
  'Wellness',
  '3d Website',
  'Fintech',
  'Creative',
  'Ecommerce',
  'Fashion',
  'Carousel',
  'Medicine',
  'Automative',
  'Sign in',
];

export const CATEGORY_SLUGS = {
  'Landing Page': 'landing-page',
  Apps: 'apps',
  Sections: 'sections',
  Footer: 'footer',
  Hero: 'hero',
  Background: 'background',
  Features: 'features',
  SaaS: 'saas',
  Agency: 'agency',
  AI: 'ai',
  Portfolio: 'portfolio',
  Technology: 'technology',
  Travel: 'travel',
  Wellness: 'wellness',
  '3d Website': '3d-website',
  Fintech: 'fintech',
  Creative: 'creative',
  Ecommerce: 'ecommerce',
  Fashion: 'fashion',
  Carousel: 'carousel',
  Medicine: 'medicine',
  Automative: 'automative',
  'Sign in': 'sign-in',
};

export const categoryToSlug = (category) => CATEGORY_SLUGS[category] || null;
