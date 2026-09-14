import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { REAL_TIME_ALERTS_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Sign in',
  categorySlug: 'sign-in',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.REAL_TIME_ALERTS,
  detailPath: '/templates/real-time-alerts',
  fullPrompt: REAL_TIME_ALERTS_PROMPT,
  description: 'Pixel-locked Signal login with a looping falcon film, glass card, and staged entrance.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
