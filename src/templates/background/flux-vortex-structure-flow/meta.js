import { ROUTES } from '../../../config';
import { FLUX_VORTEX_STRUCTURE_FLOW_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'flux-vortex-structure-flow',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4560,
  height: 'h-[272px]',
  livePath: ROUTES.FLUX_VORTEX_STRUCTURE_FLOW,
  detailPath: '/templates/flux-vortex-structure-flow',
  fullPrompt: FLUX_VORTEX_STRUCTURE_FLOW_PROMPT,
  description:
    'Blooming particle vortex — spiral filaments and post-process glow on a dark field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
