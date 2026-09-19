import { ROUTES } from '../../../config';
import { PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'particle-drift-constellation-field',
  title: 'Particle Drift Constellation Field',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2480,
  height: 'h-[272px]',
  livePath: ROUTES.PARTICLE_DRIFT_CONSTELLATION_FIELD,
  detailPath: '/templates/particle-drift-constellation-field',
  fullPrompt: PARTICLE_DRIFT_CONSTELLATION_FIELD_PROMPT,
  description:
    'A soft particle drift field lifted from a compute-network hero stage.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
