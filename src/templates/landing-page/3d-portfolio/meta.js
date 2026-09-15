import { JACK_3D_PROMPT } from './prompt';
import { ROUTES } from '../../../config';

const CARD_PREVIEW = '/images/Assets%203D%20Portfolio/3DCreator.png';

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
  previewImage: CARD_PREVIEW,
  previewGif: CARD_PREVIEW,
};

export default meta;
