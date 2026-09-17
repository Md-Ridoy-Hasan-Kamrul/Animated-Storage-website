import { ROUTES } from '../../../config';
import { BLUE_SCREEN_CRT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'blue-screen-crt',
  title: 'Blue Screen CRT',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2270,
  height: 'h-[272px]',
  livePath: ROUTES.BLUE_SCREEN_CRT,
  detailPath: '/templates/blue-screen-crt',
  fullPrompt: BLUE_SCREEN_CRT_PROMPT,
  description:
    'Broadcast-blue signal-fault CRT with transport noise, row jitter, dropout band, and heavy static.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
