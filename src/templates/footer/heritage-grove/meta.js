import { ROUTES } from '../../../config';
import { HERITAGE_GROVE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'heritage-grove',
  title: 'Heritage Grove',
  category: 'Footer',
  categorySlug: 'footer',
  pricing: 'Free',
  likes: 5733,
  height: 'h-[272px]',
  livePath: ROUTES.HERITAGE_GROVE,
  detailPath: '/templates/heritage-grove',
  fullPrompt: HERITAGE_GROVE_PROMPT,
  description:
    'Full-viewport Heritage Grove footer on a teal ink landscape loop, cream paper type, and CSS rise-in.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
