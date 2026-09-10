import { ROUTES } from '../../../config';
import { PORTFOLIO_COSMIC_PROMPT } from './prompt';
import { PROJECTS } from './content';

export const meta = {
  id: 'portfolio-cosmic',
  title: 'Portfolio Cosmic',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.PORTFOLIO_COSMIC,
  detailPath: '/templates/portfolio-cosmic',
  fullPrompt: PORTFOLIO_COSMIC_PROMPT,
  description:
    'Dark Michael Smith portfolio with HLS hero, GSAP loading, bento works, and parallax explorations.',
  previewImage: PROJECTS[0].image,
  previewGif: PROJECTS[1].image,
};

export default meta;
