import { ROUTES } from '../../../config';
import { IGNITION_BUTTON_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'ignition-button',
  title: 'Ignition',
  category: 'Button',
  categorySlug: 'button',
  pricing: 'Free',
  likes: 2710,
  height: 'h-[272px]',
  livePath: ROUTES.IGNITION_BUTTON,
  detailPath: '/templates/ignition-button',
  fullPrompt: IGNITION_BUTTON_PROMPT,
  description: 'A raw-WebGL ambient field with a tactile ignition control.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
