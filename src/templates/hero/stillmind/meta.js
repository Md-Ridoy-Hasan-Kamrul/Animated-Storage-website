import { ROUTES } from '../../../config';
import { PREVIEW_STILL } from './content';
import { STILLMIND_PROMPT } from './prompt';

export const meta = {
  id: 'stillmind',
  title: 'Stillmind',
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.STILLMIND,
  detailPath: '/templates/stillmind',
  fullPrompt: STILLMIND_PROMPT,
  description:
    'Lumora cinematic hero: four looping films, liquid-glass nav, and a Deep Woods dark shift.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
