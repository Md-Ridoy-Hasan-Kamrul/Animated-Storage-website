import { ROUTES } from '../../../config';
import { MERIDIAN_KEYCAP_SECONDARY_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'meridian-keycap-secondary-rectangle-buttons',
  title: 'Meridian Keycap Secondary Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2742,
  height: 'h-[272px]',
  livePath: ROUTES.MERIDIAN_KEYCAP_SECONDARY_RECTANGLE_BUTTONS,
  detailPath: '/templates/meridian-keycap-secondary-rectangle-buttons',
  fullPrompt: MERIDIAN_KEYCAP_SECONDARY_RECTANGLE_BUTTONS_PROMPT,
  description:
    'The selected Meridian secondary action using the same tactile keycap geometry in its graphite night-side treatment.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
