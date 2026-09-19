import { ROUTES } from '../../../config';
import { EMBER_KEYCAP_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'ember-keycap-rectangle-buttons',
  title: 'Ember Keycap Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2752,
  height: 'h-[272px]',
  livePath: ROUTES.EMBER_KEYCAP_RECTANGLE_BUTTONS,
  detailPath: '/templates/ember-keycap-rectangle-buttons',
  fullPrompt: EMBER_KEYCAP_RECTANGLE_BUTTONS_PROMPT,
  description:
    'A tactile pre-order keycap with an ember spark, machined graphite cap, top-edge glow, bloom, price legend, and pressed hover travel.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
