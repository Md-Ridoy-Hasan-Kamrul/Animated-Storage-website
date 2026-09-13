import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { NIKE_HOVER_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Features',
  categorySlug: 'features',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.NIKE_HOVER,
  detailPath: '/templates/nike-hover',
  fullPrompt: NIKE_HOVER_PROMPT,
  description:
    'Nike hover feature: SVG spotlight trail reveals a looping film under a static overlay.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
