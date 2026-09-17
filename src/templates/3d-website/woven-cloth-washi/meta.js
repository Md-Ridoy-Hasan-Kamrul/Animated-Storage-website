import { ROUTES } from '../../../config';
import { WOVEN_CLOTH_WASHI_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'woven-cloth-washi',
  title: 'Washi Noren Woven Cloth',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 1590,
  height: 'h-[272px]',
  livePath: ROUTES.WOVEN_CLOTH_WASHI,
  detailPath: '/templates/woven-cloth-washi',
  fullPrompt: WOVEN_CLOTH_WASHI_PROMPT,
  description:
    'Indigo-dyed kozo noren on a wooden rod — deckle edge, papermaking screen lines, and three slit panels that sway independently.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
