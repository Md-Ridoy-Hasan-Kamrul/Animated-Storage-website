import { ROUTES } from '../../../config';
import { THINKING_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'thinking-button',
  title: 'Thinking',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2787,
  height: 'h-[272px]',
  livePath: ROUTES.THINKING_BUTTON,
  detailPath: '/templates/thinking-button',
  fullPrompt: THINKING_BUTTON_PROMPT,
  description: 'A luminous Canvas 2D trace orbiting a softly raised blue button.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
