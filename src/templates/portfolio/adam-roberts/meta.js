import { ROUTES } from '../../../config';
import { ADAM_ROBERTS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'adam-roberts',
  title: 'Adam Roberts',
  category: 'Portfolio',
  categorySlug: 'portfolio',
  pricing: 'Free',
  likes: 1132,
  height: 'h-[272px]',
  livePath: ROUTES.ADAM_ROBERTS,
  detailPath: '/templates/adam-roberts',
  fullPrompt: ADAM_ROBERTS_PROMPT,
  description:
    'Locked-viewport Grilled Pixels portfolio with looping hero film, basis33 pixel type, and staggered mobile menu.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
