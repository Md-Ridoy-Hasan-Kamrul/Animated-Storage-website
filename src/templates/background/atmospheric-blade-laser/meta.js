import { ROUTES } from '../../../config';
import { ATMOSPHERIC_BLADE_LASER_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'atmospheric-blade-laser',
  title: 'Atmospheric Blade Laser',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2655,
  height: 'h-[272px]',
  livePath: ROUTES.ATMOSPHERIC_BLADE_LASER,
  detailPath: '/templates/atmospheric-blade-laser',
  fullPrompt: ATMOSPHERIC_BLADE_LASER_PROMPT,
  description:
    'A white-hot emerald blade cutting through layered procedural vapor and faint mirage rails.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
