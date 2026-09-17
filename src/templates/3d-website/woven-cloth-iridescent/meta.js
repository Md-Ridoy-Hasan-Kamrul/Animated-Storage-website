import { ROUTES } from '../../../config';
import { WOVEN_CLOTH_IRIDESCENT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'woven-cloth-iridescent',
  title: 'Iridescent Silk Woven Cloth',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 1720,
  height: 'h-[272px]',
  livePath: ROUTES.WOVEN_CLOTH_IRIDESCENT,
  detailPath: '/templates/woven-cloth-iridescent',
  fullPrompt: WOVEN_CLOTH_IRIDESCENT_PROMPT,
  description:
    'Five-harness satin with thin-film interference bloom — colour travels the folds while the wordmark stays tone-on-tone jacquard.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
