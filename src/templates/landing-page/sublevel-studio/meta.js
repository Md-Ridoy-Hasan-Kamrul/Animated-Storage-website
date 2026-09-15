import { ROUTES } from '../../../config';
import { SUBLEVEL_STUDIO_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'sublevel-studio',
  title: 'Sublevel Studio',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 3680,
  height: 'h-[272px]',
  livePath: ROUTES.SUBLEVEL_STUDIO,
  detailPath: '/templates/sublevel-studio',
  fullPrompt: SUBLEVEL_STUDIO_PROMPT,
  description:
    'Black-and-white studio OS — modular project cells, floating dock, diagnostics, lab experiments, and terminal contact.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
