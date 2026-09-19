import { ROUTES } from '../../../config';
import { INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'interface-lines-constellation-field',
  title: 'Interface Lines Constellation Field',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2460,
  height: 'h-[272px]',
  livePath: ROUTES.INTERFACE_LINES_CONSTELLATION_FIELD,
  detailPath: '/templates/interface-lines-constellation-field',
  fullPrompt: INTERFACE_LINES_CONSTELLATION_FIELD_PROMPT,
  description: 'A faint interface line-field background for dense system UI stages.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
