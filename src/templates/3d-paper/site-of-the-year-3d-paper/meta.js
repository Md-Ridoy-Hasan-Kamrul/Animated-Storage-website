import { ROUTES } from '../../../config';
import { SITE_OF_THE_YEAR_3D_PAPER_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'site-of-the-year-3d-paper',
  title: CARD_TITLE,
  category: '3D Paper',
  categorySlug: '3d-paper',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.SITE_OF_THE_YEAR_3D_PAPER,
  detailPath: '/templates/site-of-the-year-3d-paper',
  fullPrompt: SITE_OF_THE_YEAR_3D_PAPER_PROMPT,
  description:
    'Site of the Year award sheet with vivid lime scoring, season XP, winner metadata, and translucent paper motion.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
