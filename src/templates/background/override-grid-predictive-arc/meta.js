import { ROUTES } from '../../../config';
import { OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'override-grid-predictive-arc',
  title: 'Override Grid Predictive Arc',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2140,
  height: 'h-[272px]',
  livePath: ROUTES.OVERRIDE_GRID_PREDICTIVE_ARC,
  detailPath: '/templates/override-grid-predictive-arc',
  fullPrompt: OVERRIDE_GRID_PREDICTIVE_ARC_PROMPT,
  description:
    'Block-by-block override grid with telemetry-orange accents — focused Canvas 2D wave field.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
