import { ROUTES } from '../../../config';
import { LIQUID_FORM_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'liquid-form',
  title: 'Liquid Form',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2280,
  height: 'h-[272px]',
  livePath: ROUTES.LIQUID_FORM,
  detailPath: '/templates/liquid-form',
  fullPrompt: LIQUID_FORM_PROMPT,
  description:
    'Centered silver ray-marched liquid metal with studio reflections and pointer-responsive camera drift.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
