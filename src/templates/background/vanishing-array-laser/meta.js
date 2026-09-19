import { ROUTES } from '../../../config';
import { VANISHING_ARRAY_LASER_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'vanishing-array-laser',
  title: 'Vanishing Array Laser',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2670,
  height: 'h-[272px]',
  livePath: ROUTES.VANISHING_ARRAY_LASER,
  detailPath: '/templates/vanishing-array-laser',
  fullPrompt: VANISHING_ARRAY_LASER_PROMPT,
  description:
    'Violet and amber carrier rails accelerate from a pointer-steered horizon origin.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
