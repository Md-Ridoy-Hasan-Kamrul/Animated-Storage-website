import { ROUTES } from '../../../config';
import { FLOW_FIELD_PORTAL_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'flow-field-portal-field',
  title: 'Flow Field Portal Field',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2620,
  height: 'h-[272px]',
  livePath: ROUTES.FLOW_FIELD_PORTAL_FIELD,
  detailPath: '/templates/flow-field-portal-field',
  fullPrompt: FLOW_FIELD_PORTAL_FIELD_PROMPT,
  description:
    'Warm amber, gold, and coral particles trace a deterministic simplex-noise field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
