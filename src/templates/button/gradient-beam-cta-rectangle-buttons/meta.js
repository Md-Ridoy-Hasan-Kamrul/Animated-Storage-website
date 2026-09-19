import { ROUTES } from '../../../config';
import { GRADIENT_BEAM_CTA_RECTANGLE_BUTTONS_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'gradient-beam-cta-rectangle-buttons',
  title: 'Gradient Beam CTA Rectangle Buttons',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2364,
  height: 'h-[272px]',
  livePath: ROUTES.GRADIENT_BEAM_CTA_RECTANGLE_BUTTONS,
  detailPath: '/templates/gradient-beam-cta-rectangle-buttons',
  fullPrompt: GRADIENT_BEAM_CTA_RECTANGLE_BUTTONS_PROMPT,
  description:
    'A dark builder CTA with a rotating orange edge beam, drifting dot texture, and responsive glow.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
