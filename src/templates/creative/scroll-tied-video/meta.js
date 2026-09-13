import { ROUTES } from '../../../config';
import { SCROLL_TIED_VIDEO_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'scroll-tied-video',
  title: 'Vectrus Energy',
  category: 'Creative',
  categorySlug: 'creative',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.SCROLL_TIED_VIDEO,
  detailPath: '/templates/scroll-tied-video',
  fullPrompt: SCROLL_TIED_VIDEO_PROMPT,
  description:
    'Vectrus cinematic scroll-scrub: sticky 500vh aerial film, sequential type, and lerp-smoothed frames.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
