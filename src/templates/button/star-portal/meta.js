import { ROUTES } from '../../../config';
import { STAR_PORTAL_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'star-portal',
  title: 'Star Portal',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2680,
  height: 'h-[272px]',
  livePath: ROUTES.STAR_PORTAL,
  detailPath: '/templates/star-portal',
  fullPrompt: STAR_PORTAL_PROMPT,
  description: 'Two drifting Canvas 2D star fields with an authored holographic pill button.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
