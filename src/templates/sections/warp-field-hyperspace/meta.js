import { ROUTES } from '../../../config';
import { WARP_FIELD_HYPERSPACE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'warp-field-hyperspace',
  title: 'Hyperspace Warp Field',
  category: 'Sections',
  categorySlug: 'sections',
  pricing: 'Free',
  likes: 2050,
  height: 'h-[272px]',
  livePath: ROUTES.WARP_FIELD_HYPERSPACE,
  detailPath: '/templates/warp-field-hyperspace',
  fullPrompt: WARP_FIELD_HYPERSPACE_PROMPT,
  description:
    'Hyperspace warp — 1,200 ice-blue streaks down a scrolling tunnel toward a pulsing jump core.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
