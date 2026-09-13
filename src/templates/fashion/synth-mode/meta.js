import { ROUTES } from '../../../config';
import { CARD_ID, CARD_TITLE } from './constants';
import { PREVIEW_STILL } from './content';
import { SYNTH_MODE_PROMPT } from './prompt';

export const meta = {
  id: CARD_ID,
  title: CARD_TITLE,
  category: 'Fashion',
  categorySlug: 'fashion',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.SYNTH_MODE,
  detailPath: '/templates/synth-mode',
  fullPrompt: SYNTH_MODE_PROMPT,
  description: 'Pure-white LGPSM fashion hero with a dual-image mouse spotlight reveal.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
