import { ROUTES } from '../../../config';
import { GLOBE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'globe',
  title: 'Globe',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2410,
  height: 'h-[272px]',
  livePath: ROUTES.GLOBE,
  detailPath: '/templates/globe',
  fullPrompt: GLOBE_PROMPT,
  description:
    'Layered FBM energy sphere with translucent rim glow and a depth-aware star field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
