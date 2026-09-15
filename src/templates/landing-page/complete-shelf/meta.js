import { ROUTES } from '../../../config';
import { COMPLETE_SHELF_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'complete-shelf',
  title: 'Working Volumes',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 3890,
  height: 'h-[272px]',
  livePath: ROUTES.COMPLETE_SHELF,
  detailPath: '/templates/complete-shelf',
  fullPrompt: COMPLETE_SHELF_PROMPT,
  description:
    'Working Volumes bookshelf — seven tactile field guides with an editorial interface and interactive Three.js presentation.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
