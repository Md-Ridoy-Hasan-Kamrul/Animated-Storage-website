import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { VEYRA_ELECTRIC_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Automative',
  categorySlug: 'automative',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.VEYRA_ELECTRIC,
  detailPath: '/templates/veyra-electric',
  fullPrompt: VEYRA_ELECTRIC_PROMPT,
  description: 'VEYRA interactive EV study: hover films, cutaways, and appearance docks from the v1.0.0 release.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
