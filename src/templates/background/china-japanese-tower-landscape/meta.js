import { ROUTES } from '../../../config';
import { CHINA_JAPANESE_TOWER_LANDSCAPE_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'china-japanese-tower-landscape',
  title: CARD_TITLE,
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 4688,
  height: 'h-[272px]',
  livePath: ROUTES.CHINA_JAPANESE_TOWER_LANDSCAPE,
  detailPath: '/templates/china-japanese-tower-landscape',
  fullPrompt: CHINA_JAPANESE_TOWER_LANDSCAPE_PROMPT,
  description:
    'Chinese pagoda in vermilion lacquer and green glaze beneath a gilt finial.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
