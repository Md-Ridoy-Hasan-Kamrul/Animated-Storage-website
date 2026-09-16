import { ROUTES } from '../../../config';
import { LOGIC_CORE_STRUCTURE_FLOW_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'logic-core-structure-flow',
  title: CARD_TITLE,
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 3960,
  height: 'h-[272px]',
  livePath: ROUTES.LOGIC_CORE_STRUCTURE_FLOW,
  detailPath: '/templates/logic-core-structure-flow',
  fullPrompt: LOGIC_CORE_STRUCTURE_FLOW_PROMPT,
  description:
    'Isometric Logic Core — illuminated platform, emissive core, and orbiting data nodes.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
