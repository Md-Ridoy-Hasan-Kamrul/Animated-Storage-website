import { ROUTES } from '../../../config';
import { ASHEN_PRESS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'ashen-press',
  title: 'Book shelf',
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 1880,
  height: 'h-[272px]',
  livePath: ROUTES.ASHEN_PRESS,
  detailPath: '/templates/ashen-press',
  fullPrompt: ASHEN_PRESS_PROMPT,
  description:
    'Tactile 3D art-book shelf with clothbound volumes, illustrated plates, oak furniture, and direct flip and drag interactions.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
