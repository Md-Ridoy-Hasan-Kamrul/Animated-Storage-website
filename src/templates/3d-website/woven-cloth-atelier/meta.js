import { ROUTES } from '../../../config';
import { WOVEN_CLOTH_ATELIER_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'woven-cloth-atelier',
  title: 'Atelier Flag Woven Cloth',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 1680,
  height: 'h-[272px]',
  livePath: ROUTES.WOVEN_CLOTH_ATELIER,
  detailPath: '/templates/woven-cloth-atelier',
  fullPrompt: WOVEN_CLOTH_ATELIER_PROMPT,
  description:
    'Three linen panels with flat-felled seams, indigo hoist tape, brass grommets, and a woven corner label on a Verlet flag sheet.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
