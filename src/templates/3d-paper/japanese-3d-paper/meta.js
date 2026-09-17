import { ROUTES } from '../../../config';
import { JAPANESE_3D_PAPER_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'japanese-3d-paper',
  title: CARD_TITLE,
  category: '3D Paper',
  categorySlug: '3d-paper',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.JAPANESE_3D_PAPER,
  detailPath: '/templates/japanese-3d-paper',
  fullPrompt: JAPANESE_3D_PAPER_PROMPT,
  description:
    'Japanese recognition certificate with vertical display type, warm gold accents, bilingual details, and translucent paper motion.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
