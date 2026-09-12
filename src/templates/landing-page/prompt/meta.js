import { ROUTES } from '../../../config';
import { PROMPT_ARCHIVE_PROMPT } from './prompt';
import { GALLERY_IMAGES } from './content';

export const meta = {
  id: 'prompt',
  title: 'Prompt',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 988,
  height: 'h-[272px]',
  livePath: ROUTES.PROMPT_ARCHIVE,
  detailPath: '/templates/prompt',
  fullPrompt: PROMPT_ARCHIVE_PROMPT,
  description: 'Scroll-driven prmpt archive fashion landing with dual video scrub.',
  previewImage: GALLERY_IMAGES[0],
  previewGif: GALLERY_IMAGES[1],
};

export default meta;
