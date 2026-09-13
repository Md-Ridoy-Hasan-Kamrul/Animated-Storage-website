import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { CONTACT_CYBERNETIC_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.CONTACT_CYBERNETIC,
  detailPath: '/templates/contact-cybernetic',
  fullPrompt: CONTACT_CYBERNETIC_PROMPT,
  description: 'Mainframe contact hero with mouse-scrubbed film, typewriter, and multi-select service pills.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
