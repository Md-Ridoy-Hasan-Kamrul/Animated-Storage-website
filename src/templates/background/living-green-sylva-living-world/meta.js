import { ROUTES } from '../../../config';
import { SYLVA_LIVING_WORLD_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'living-green-sylva-living-world',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4180,
  height: 'h-[272px]',
  livePath: ROUTES.LIVING_GREEN_SYLVA_LIVING_WORLD,
  detailPath: '/templates/living-green-sylva-living-world',
  fullPrompt: SYLVA_LIVING_WORLD_PROMPT,
  description:
    'Scene-only moss-root Sylva world — pale flowers, ferns, drifting pollen, scan light, and a landing butterfly.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
