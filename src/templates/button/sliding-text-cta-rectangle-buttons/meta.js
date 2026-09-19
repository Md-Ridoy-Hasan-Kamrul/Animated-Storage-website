import { ROUTES } from '../../../config';
import { SLIDING_TEXT_CTA_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'sliding-text-cta-rectangle-buttons',
  title: 'Sliding Text CTA Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2187,
  height: 'h-[272px]',
  livePath: ROUTES.SLIDING_TEXT_CTA_RECTANGLE_BUTTONS,
  detailPath: '/templates/sliding-text-cta-rectangle-buttons',
  fullPrompt: SLIDING_TEXT_CTA_RECTANGLE_BUTTONS_PROMPT,
  description:
    'A dark rectangle CTA whose label slides, blurs, and resolves into a crisp duplicate on hover.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
