import { ROUTES } from '../../../config';
import { WARP_FIELD_LETTER_STORM_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'warp-field-letter-storm',
  title: 'Letter Storm Warp Field',
  category: 'Sections',
  categorySlug: 'sections',
  pricing: 'Free',
  likes: 1980,
  height: 'h-[272px]',
  livePath: ROUTES.WARP_FIELD_LETTER_STORM,
  detailPath: '/templates/warp-field-letter-storm',
  fullPrompt: WARP_FIELD_LETTER_STORM_PROMPT,
  description:
    'Letter Storm warp — 160 tumbling glyphs off the rails while the streak corridor keeps moving.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
