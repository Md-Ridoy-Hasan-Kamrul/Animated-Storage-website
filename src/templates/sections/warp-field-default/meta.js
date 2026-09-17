import { ROUTES } from '../../../config';
import { WARP_FIELD_DEFAULT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'warp-field-default',
  title: 'Warp Field Default Variant',
  category: 'Sections',
  categorySlug: 'sections',
  pricing: 'Free',
  likes: 2140,
  height: 'h-[272px]',
  livePath: ROUTES.WARP_FIELD_DEFAULT,
  detailPath: '/templates/warp-field-default',
  fullPrompt: WARP_FIELD_DEFAULT_PROMPT,
  description:
    'Original hero warp field — 400 emerald streaks and 40 luminous tiles streaming through deep-space fog.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
