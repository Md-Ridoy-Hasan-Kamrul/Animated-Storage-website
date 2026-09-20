import { ROUTES } from '../../../config';
import { INDUCTION_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'induction-button',
  title: 'Induction',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2735,
  height: 'h-[272px]',
  livePath: ROUTES.INDUCTION_BUTTON,
  detailPath: '/templates/induction-button',
  fullPrompt: INDUCTION_BUTTON_PROMPT,
  description: 'A kinetic ambient field paired with a raw-WebGL induction button.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
