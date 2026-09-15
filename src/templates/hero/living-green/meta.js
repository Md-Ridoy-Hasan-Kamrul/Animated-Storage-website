import { ROUTES } from '../../../config';
import { SYLVA_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'living-green',
  title: 'Living Green — Sylva',
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 4210,
  height: 'h-[272px]',
  livePath: ROUTES.LIVING_GREEN,
  detailPath: '/templates/living-green',
  fullPrompt: SYLVA_PROMPT,
  description:
    'Moss-root Sylva world — pale flowers, ferns, drifting pollen, landing butterfly, and liquid-metal controls.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
