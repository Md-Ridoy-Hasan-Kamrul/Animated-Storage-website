import { ROUTES } from '../../../config';
import { GENERATE_BUTTON_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'generate-button-rectangle-buttons',
  title: 'Generate Button Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2487,
  height: 'h-[272px]',
  livePath: ROUTES.GENERATE_BUTTON_RECTANGLE_BUTTONS,
  detailPath: '/templates/generate-button-rectangle-buttons',
  fullPrompt: GENERATE_BUTTON_RECTANGLE_BUTTONS_PROMPT,
  description:
    'A glossy generate control with prismatic borders, animated lettering, and an illuminated sparkle icon.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
