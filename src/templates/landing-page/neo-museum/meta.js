import { ROUTES } from '../../../config';
import { NEO_MUSEUM_PROMPT } from './prompt';
import { CHAPTERS } from './content';

export const meta = {
  id: 'neo-museum',
  title: 'Neo Museum',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.NEO_MUSEUM,
  detailPath: '/templates/neo-museum',
  fullPrompt: NEO_MUSEUM_PROMPT,
  description:
    'NHM natural-history landing with NHM letter reveal, delayed hero video, and sand-dissolve chapter gallery.',
  previewImage: CHAPTERS[2].image,
  previewGif: CHAPTERS[0].image,
};

export default meta;
