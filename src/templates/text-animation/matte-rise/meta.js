import { ROUTES } from '../../../config';
import { MATTE_RISE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'matte-rise',
  title: 'Matte Rise',
  category: 'Text Animation',
  categorySlug: 'text-animation',
  pricing: 'Free',
  likes: 2410,
  height: 'h-[272px]',
  livePath: ROUTES.MATTE_RISE,
  detailPath: '/templates/matte-rise',
  fullPrompt: MATTE_RISE_PROMPT,
  description:
    'Muted museum plates under one slow rise of noise, a light sans on wide tracking, and an ascending ring that springs up to speed instead of easing.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
