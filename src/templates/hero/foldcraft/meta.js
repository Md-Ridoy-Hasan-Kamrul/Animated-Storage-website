import { ROUTES } from '../../../config';
import { FOLDCRAFT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'foldcraft',
  title: 'Foldcraft',
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.FOLDCRAFT,
  detailPath: '/templates/foldcraft',
  fullPrompt: FOLDCRAFT_PROMPT,
  description:
    'Fullscreen studio hero with looping video, Geist type, and a staggered mobile menu.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
