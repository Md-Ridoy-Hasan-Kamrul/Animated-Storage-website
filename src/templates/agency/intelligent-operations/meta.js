import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { NOVA_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Agency',
  categorySlug: 'agency',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.INTELLIGENT_OPERATIONS,
  detailPath: '/templates/intelligent-operations',
  fullPrompt: NOVA_PROMPT,
  description:
    'NovaAI cinematic agency page: scroll-scrubbed hero film, glass nav, and frosted capability panel.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
