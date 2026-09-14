import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { SCALING_PLATFORM_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'SaaS',
  categorySlug: 'saas',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.SCALING_PLATFORM,
  detailPath: '/templates/scaling-platform',
  fullPrompt: SCALING_PLATFORM_PROMPT,
  description: 'Targo SaaS hero and about with staircase type over a contained film.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
