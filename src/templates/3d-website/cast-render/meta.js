import { ROUTES } from '../../../config';
import { CAST_RENDER_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'cast-render',
  title: 'Cast & Render',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.CAST_RENDER,
  detailPath: '/templates/cast-render',
  fullPrompt: CAST_RENDER_PROMPT,
  description:
    'Scroll-scrubbed Cast & Render studio page with three cross-fading panels over an all-intra film.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
