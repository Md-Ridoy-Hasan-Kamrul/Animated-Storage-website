import { ROUTES } from '../../../config';
import { MERIDIAN_KEYCAP_PRIMARY_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'meridian-keycap-primary-rectangle-buttons',
  title: 'Meridian Keycap Primary Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2738,
  height: 'h-[272px]',
  livePath: ROUTES.MERIDIAN_KEYCAP_PRIMARY_RECTANGLE_BUTTONS,
  detailPath: '/templates/meridian-keycap-primary-rectangle-buttons',
  fullPrompt: MERIDIAN_KEYCAP_PRIMARY_RECTANGLE_BUTTONS_PROMPT,
  description:
    'The selected Meridian primary action rebuilt as a blue illuminated keycap with a physical base, LED, and pressed hover travel.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
