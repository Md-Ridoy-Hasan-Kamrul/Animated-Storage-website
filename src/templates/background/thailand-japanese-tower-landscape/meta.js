import { ROUTES } from '../../../config';
import { THAILAND_JAPANESE_TOWER_LANDSCAPE_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'thailand-japanese-tower-landscape',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4692,
  height: 'h-[272px]',
  livePath: ROUTES.THAILAND_JAPANESE_TOWER_LANDSCAPE,
  detailPath: '/templates/thailand-japanese-tower-landscape',
  fullPrompt: THAILAND_JAPANESE_TOWER_LANDSCAPE_PROMPT,
  description:
    'Thai prang rising from a stepped plinth into a richly detailed gold spire.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
