import { ROUTES } from '../../../config';
import { PREVIEW_STILL } from './content';
import { MOSTAR_PROMPT } from './prompt';

export const meta = {
  id: 'mostar-city',
  title: 'Mostar city',
  category: 'Travel',
  categorySlug: 'travel',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.MOSTAR_CITY,
  detailPath: '/templates/mostar-city',
  fullPrompt: MOSTAR_PROMPT,
  description: 'A cinematic three-screen scroll story for Mostar city.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
