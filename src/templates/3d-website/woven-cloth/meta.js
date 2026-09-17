import { ROUTES } from '../../../config';
import { WOVEN_CLOTH_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'woven-cloth',
  title: 'Woven Cloth',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 1640,
  height: 'h-[272px]',
  livePath: ROUTES.WOVEN_CLOTH,
  detailPath: '/templates/woven-cloth',
  fullPrompt: WOVEN_CLOTH_PROMPT,
  description:
    'Ivory banner with a crimson hem and Woven Cloth wordmark printed into a pinned Verlet cloth weave.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
