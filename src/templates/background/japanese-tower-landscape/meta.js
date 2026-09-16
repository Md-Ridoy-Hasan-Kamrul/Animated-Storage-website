import { ROUTES } from '../../../config';
import { JAPANESE_TOWER_LANDSCAPE_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'japanese-tower-landscape',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4720,
  height: 'h-[272px]',
  livePath: ROUTES.JAPANESE_TOWER_LANDSCAPE,
  detailPath: '/templates/japanese-tower-landscape',
  fullPrompt: JAPANESE_TOWER_LANDSCAPE_PROMPT,
  description:
    'Japanese tenshu with ishigaki stone base, plastered storeys, and flying tiled eaves.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
