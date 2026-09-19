import { ROUTES } from '../../../config';
import { SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'sign-up-pill-liquid-metal-button',
  title: 'Sign up Pill',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2840,
  height: 'h-[272px]',
  livePath: ROUTES.SIGN_UP_PILL_LIQUID_METAL_BUTTON,
  detailPath: '/templates/sign-up-pill-liquid-metal-button',
  fullPrompt: SIGN_UP_PILL_LIQUID_METAL_BUTTON_PROMPT,
  description:
    'The original authored liquid-metal Sign up pill with its complete spectral field, bloom, pointer well, and faceted press ripple.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
