import { ROUTES } from '../../../config';
import { TURKEY_JAPANESE_TOWER_LANDSCAPE_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'turkey-japanese-tower-landscape',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4693,
  height: 'h-[272px]',
  livePath: ROUTES.TURKEY_JAPANESE_TOWER_LANDSCAPE,
  detailPath: '/templates/turkey-japanese-tower-landscape',
  fullPrompt: TURKEY_JAPANESE_TOWER_LANDSCAPE_PROMPT,
  description:
    'Ottoman mosque with limestone ashlar, İznik tile, a lead dome, and twin pencil minarets.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
