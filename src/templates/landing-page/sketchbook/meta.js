import { ROUTES } from '../../../config';
import { SKETCHBOOK_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'sketchbook',
  title: 'Sketchbook',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 4120,
  height: 'h-[272px]',
  livePath: ROUTES.SKETCHBOOK,
  detailPath: '/templates/sketchbook',
  fullPrompt: SKETCHBOOK_PROMPT,
  description:
    'Singapore sketchbook portfolio — curled page turns, loupe, botanical paper, and editorial plates.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
