import { ROUTES } from '../../../config';
import { GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'gateway-flow-constellation-field',
  title: 'Gateway Flow Constellation Field',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2510,
  height: 'h-[272px]',
  livePath: ROUTES.GATEWAY_FLOW_CONSTELLATION_FIELD,
  detailPath: '/templates/gateway-flow-constellation-field',
  fullPrompt: GATEWAY_FLOW_CONSTELLATION_FIELD_PROMPT,
  description: 'A black-stage flow canvas with streaming gateway trajectories.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
