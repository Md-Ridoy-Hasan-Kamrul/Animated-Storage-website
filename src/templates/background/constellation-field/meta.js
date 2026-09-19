import { ROUTES } from '../../../config';
import { CONSTELLATION_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'constellation-field',
  title: 'Constellation Field Default Variant',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2540,
  height: 'h-[272px]',
  livePath: ROUTES.CONSTELLATION_FIELD,
  detailPath: '/templates/constellation-field',
  fullPrompt: CONSTELLATION_FIELD_PROMPT,
  description:
    'Drifting particle constellation network with tunable link stroke width over a deep night field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
