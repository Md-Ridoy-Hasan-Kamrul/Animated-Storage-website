import { JACK_3D_PROMPT } from './prompt';
import { PORTRAIT_URL, MARQUEE_GIFS } from './content';
import { ROUTES } from '../../../config';

/** Gallery + route metadata for Landing Page → 3D Portfolio */
export const meta = {
  id: '3d-portfolio',
  title: '3D Portfolio',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 1815,
  height: 'h-[272px]',
  livePath: ROUTES.JACK_PORTFOLIO,
  detailPath: '/templates/3d-portfolio',
  fullPrompt: JACK_3D_PROMPT,
  description: 'Animated 3D creator portfolio for Kamrul with Framer Motion.',
  previewImage: PORTRAIT_URL,
  previewGif: MARQUEE_GIFS[12],
};

export default meta;
