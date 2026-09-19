import { ROUTES } from '../../../config';
import { MATRIX_JUNCTION_LASER_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'matrix-junction-laser',
  title: 'Matrix Junction Laser',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2640,
  height: 'h-[272px]',
  livePath: ROUTES.MATRIX_JUNCTION_LASER,
  detailPath: '/templates/matrix-junction-laser',
  fullPrompt: MATRIX_JUNCTION_LASER_PROMPT,
  description: 'The preserved pointer-reactive three-way matrix junction.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
