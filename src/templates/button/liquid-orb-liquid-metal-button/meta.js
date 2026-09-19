import { ROUTES } from '../../../config';
import { LIQUID_ORB_LIQUID_METAL_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'liquid-orb-liquid-metal-button',
  title: 'Liquid Orb',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2795,
  height: 'h-[272px]',
  livePath: ROUTES.LIQUID_ORB_LIQUID_METAL_BUTTON,
  detailPath: '/templates/liquid-orb-liquid-metal-button',
  fullPrompt: LIQUID_ORB_LIQUID_METAL_BUTTON_PROMPT,
  description:
    'The exact liquid-metal WebGL field measured through a compact 56–72px circular plus control, preserving every original interaction and post-process pass.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
