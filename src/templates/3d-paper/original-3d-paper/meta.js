import { ROUTES } from '../../../config';
import { ORIGINAL_3D_PAPER_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'original-3d-paper',
  title: CARD_TITLE,
  category: '3D Paper',
  categorySlug: '3d-paper',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.ORIGINAL_3D_PAPER,
  detailPath: '/templates/original-3d-paper',
  fullPrompt: ORIGINAL_3D_PAPER_PROMPT,
  description:
    'Original translucent Nocturne certificate with monochrome editorial typography and procedural glass.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
