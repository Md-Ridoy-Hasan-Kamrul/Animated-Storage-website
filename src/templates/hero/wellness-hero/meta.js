import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { WELLNESS_HERO_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.WELLNESS_HERO,
  detailPath: '/templates/wellness-hero',
  fullPrompt: WELLNESS_HERO_PROMPT,
  description: 'Aurai full-viewport wellness hero with glass pills over a looping film.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
