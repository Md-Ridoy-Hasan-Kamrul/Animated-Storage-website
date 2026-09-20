import { ROUTES } from '../../../config';
import { HALFTONE_LOOP_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'halftone-loop',
  title: 'Halftone Loop',
  category: 'Text Animation',
  categorySlug: 'text-animation',
  pricing: 'Free',
  likes: 2418,
  height: 'h-[272px]',
  livePath: ROUTES.HALFTONE_LOOP,
  detailPath: '/templates/halftone-loop',
  fullPrompt: HALFTONE_LOOP_PROMPT,
  description:
    'One ink on one stock, shaded only by the size of the dots on a rotated screen, under a high-contrast didone on a tall reverse loop.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
