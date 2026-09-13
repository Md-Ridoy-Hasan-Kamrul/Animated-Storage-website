import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { LITHOS_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.INTERACTIVE_DISCOVERY,
  detailPath: '/templates/interactive-discovery',
  fullPrompt: LITHOS_PROMPT,
  description:
    'Lithos geology hero: cursor spotlight reveals a second strata image through a soft circular mask.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
