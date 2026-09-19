import { ROUTES } from '../../../config';
import { GENERATIVE_TREE_ELEMENTS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'generative-tree-elements',
  title: 'Generative Tree Elements',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2510,
  height: 'h-[272px]',
  livePath: ROUTES.GENERATIVE_TREE_ELEMENTS,
  detailPath: '/templates/generative-tree-elements',
  fullPrompt: GENERATIVE_TREE_ELEMENTS_PROMPT,
  description:
    'Painterly branching tree from warm sienna to golden tips, pointer wind, ambient motes, and sky birds.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
