import { ROUTES } from '../../../config';
import { PLAY_CIRCLE_LIQUID_METAL_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'play-circle-liquid-metal-button',
  title: 'Play Circle Liquid Metal Button',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2760,
  height: 'h-[272px]',
  livePath: ROUTES.PLAY_CIRCLE_LIQUID_METAL_BUTTON,
  detailPath: '/templates/play-circle-liquid-metal-button',
  fullPrompt: PLAY_CIRCLE_LIQUID_METAL_BUTTON_PROMPT,
  description:
    'A compact icon-only play control with configurable finish, diameter, outline, and accessible label.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
