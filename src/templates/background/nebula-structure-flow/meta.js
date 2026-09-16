import { ROUTES } from '../../../config';
import { NEBULA_STRUCTURE_FLOW_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'nebula-structure-flow',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 4120,
  height: 'h-[272px]',
  livePath: ROUTES.NEBULA_STRUCTURE_FLOW,
  detailPath: '/templates/nebula-structure-flow',
  fullPrompt: NEBULA_STRUCTURE_FLOW_PROMPT,
  description:
    'Indigo FBM nebula — pointer drift, breathing light, and soft vignette on a zinc field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
