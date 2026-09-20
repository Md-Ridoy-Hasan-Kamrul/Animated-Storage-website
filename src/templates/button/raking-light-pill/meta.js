import { ROUTES } from '../../../config';
import { RAKING_LIGHT_PILL_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'raking-light-pill',
  title: 'Raking Light Pill',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2774,
  height: 'h-[272px]',
  livePath: ROUTES.RAKING_LIGHT_PILL,
  detailPath: '/templates/raking-light-pill',
  fullPrompt: RAKING_LIGHT_PILL_PROMPT,
  description:
    'A pill-shaped shader button with raking GLSL light bands, sparse motes, a soft edge, and hover intensification.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
