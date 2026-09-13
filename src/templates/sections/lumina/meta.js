import { ROUTES } from '../../../config';
import { LUMINA_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'lumina',
  title: 'Lumina',
  category: 'Sections',
  categorySlug: 'sections',
  pricing: 'Free',
  likes: 577,
  height: 'h-[272px]',
  livePath: ROUTES.LUMINA,
  detailPath: '/templates/lumina',
  fullPrompt: LUMINA_PROMPT,
  description:
    'Immersive video section with a liquid-glass Lumina footer, Helvetica Regular, and staggered fade-up.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
