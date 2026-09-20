import { ROUTES } from '../../../config';
import { TACTILE_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'tactile-button',
  title: 'Tactile',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2761,
  height: 'h-[272px]',
  livePath: ROUTES.TACTILE_BUTTON,
  detailPath: '/templates/tactile-button',
  fullPrompt: TACTILE_BUTTON_PROMPT,
  description: 'A fluid ambient background with a tactile raw-WebGL button.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
