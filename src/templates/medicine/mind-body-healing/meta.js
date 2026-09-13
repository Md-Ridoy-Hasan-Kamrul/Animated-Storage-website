import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { MIND_BODY_HEALING_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Medicine',
  categorySlug: 'medicine',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.MIND_BODY_HEALING,
  detailPath: '/templates/mind-body-healing',
  fullPrompt: MIND_BODY_HEALING_PROMPT,
  description: 'Vibrant Wellness full-viewport hero with liquid glass over a looping film.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
