import { ROUTES } from '../../../config';
import { RISO_SWEEP_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'riso-sweep',
  title: 'Riso Sweep',
  category: 'Text Animation',
  categorySlug: 'text-animation',
  pricing: 'Free',
  likes: 2364,
  height: 'h-[272px]',
  livePath: ROUTES.RISO_SWEEP,
  detailPath: '/templates/riso-sweep',
  fullPrompt: RISO_SWEEP_PROMPT,
  description:
    'Print colour dithered to three tones over a lit corner, scanlines and heavy grain, under an old-style serif standing on a hard offset plate.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
