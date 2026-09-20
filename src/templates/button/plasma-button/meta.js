import { ROUTES } from '../../../config';
import { PLASMA_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'plasma-button',
  title: 'Plasma',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2748,
  height: 'h-[272px]',
  livePath: ROUTES.PLASMA_BUTTON,
  detailPath: '/templates/plasma-button',
  fullPrompt: PLASMA_BUTTON_PROMPT,
  description: 'A deep-blue laboratory field with a luminous plasma control.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
