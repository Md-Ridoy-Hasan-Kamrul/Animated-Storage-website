import { ROUTES } from '../../../config';
import { VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'vietnam-japanese-tower-landscape',
  title: CARD_TITLE,
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 4688,
  height: 'h-[272px]',
  livePath: ROUTES.VIETNAM_JAPANESE_TOWER_LANDSCAPE,
  detailPath: '/templates/vietnam-japanese-tower-landscape',
  fullPrompt: VIETNAM_JAPANESE_TOWER_LANDSCAPE_PROMPT,
  description:
    'Vietnamese tháp with seven octagonal Huế lime-wash storeys and lifted tiled eaves.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
