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
  'Button',
  'Text Animation',
  'Features',
  'SaaS',
  'Agency',
  'AI',
  'Portfolio',
  'Technology',
  'Travel',
  'Wellness',
  '3d Website',
  '3D Paper',
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
  Button: 'button',
  'Text Animation': 'text-animation',
  Features: 'features',
  SaaS: 'saas',
  Agency: 'agency',
  AI: 'ai',
  Portfolio: 'portfolio',
  Technology: 'technology',
  Travel: 'travel',
  Wellness: 'wellness',
  '3d Website': '3d-website',
  '3D Paper': '3d-paper',
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

/** Resolve gallery tab label from `?category=` slug (All when missing/unknown). */
export const slugToCategory = (slug) => {
  if (!slug || slug === 'all') return 'All';
  const match = Object.entries(CATEGORY_SLUGS).find(([, value]) => value === slug);
  return match ? match[0] : 'All';
};
