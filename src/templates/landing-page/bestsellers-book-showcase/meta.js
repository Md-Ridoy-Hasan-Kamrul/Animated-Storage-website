import { ROUTES } from '../../../config';
import { BESTSELLERS_BOOK_SHOWCASE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'bestsellers-book-showcase',
  title: 'Field Manuals',
  category: 'Hero',
  categorySlug: 'hero',
  pricing: 'Free',
  likes: 4120,
  height: 'h-[272px]',
  livePath: ROUTES.BESTSELLERS_BOOK_SHOWCASE,
  detailPath: '/templates/bestsellers-book-showcase',
  fullPrompt: BESTSELLERS_BOOK_SHOWCASE_PROMPT,
  description:
    'Field Manuals book showcase — earth-toned interactive library with authored motion, editorial layout, and embedded media.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
