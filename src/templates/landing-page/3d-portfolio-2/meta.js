import { ROUTES } from '../../../config';
import { JACK_3D_PROMPT } from './prompt';
import { PORTRAIT_URL, MARQUEE_GIFS } from './content';

/** Gallery + route metadata for Landing Page → 3D Portfolio 2.0 */
export const meta = {
  id: '3d-portfolio-2',
  title: '3D Portfolio 2.0',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.PORTFOLIO_3D_V2,
  detailPath: '/templates/3d-portfolio-2',
  fullPrompt: JACK_3D_PROMPT,
  description: 'Kamrul 3D creator portfolio (2.0) — Framer Motion sticky stack.',
  previewImage: PORTRAIT_URL,
  previewGif: MARQUEE_GIFS[12],
};

export default meta;
