import { ROUTES } from '../../../config';
import { ELEMENTS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'elements',
  title: 'Elements',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2480,
  height: 'h-[272px]',
  livePath: ROUTES.ELEMENTS,
  detailPath: '/templates/elements',
  fullPrompt: ELEMENTS_PROMPT,
  description:
    'Refracted OpenAI mark beneath pointer-driven circular ripples, cyan depth, and soft suspended particles.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
