import { ROUTES } from '../../../config';
import { TIDEFORM_OUTLINE_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'tideform-outline-rectangle-buttons',
  title: 'Tideform Outline Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2731,
  height: 'h-[272px]',
  livePath: ROUTES.TIDEFORM_OUTLINE_RECTANGLE_BUTTONS,
  detailPath: '/templates/tideform-outline-rectangle-buttons',
  fullPrompt: TIDEFORM_OUTLINE_RECTANGLE_BUTTONS_PROMPT,
  description:
    'The selected Tideform action: a square technical outline with tracked mono type, warm hover state, and a long directional arrow.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
