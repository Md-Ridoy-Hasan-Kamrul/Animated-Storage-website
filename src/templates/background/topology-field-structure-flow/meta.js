import { ROUTES } from '../../../config';
import { TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'topology-field-structure-flow',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 3890,
  height: 'h-[272px]',
  livePath: ROUTES.TOPOLOGY_FIELD_STRUCTURE_FLOW,
  detailPath: '/templates/topology-field-structure-flow',
  fullPrompt: TOPOLOGY_FIELD_STRUCTURE_FLOW_PROMPT,
  description:
    'Rotating topology graph — connected nodes with rhythmic point pulses on a dark field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
