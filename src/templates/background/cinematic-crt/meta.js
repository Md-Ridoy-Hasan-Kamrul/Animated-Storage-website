import { ROUTES } from '../../../config';
import { CINEMATIC_CRT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'cinematic-crt',
  title: 'Cinematic CRT',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2295,
  height: 'h-[272px]',
  livePath: ROUTES.CINEMATIC_CRT,
  detailPath: '/templates/cinematic-crt',
  fullPrompt: CINEMATIC_CRT_PROMPT,
  description:
    'Monotone academy film leader with letterbox, countdown dial, perforations, and 24 fps timecode on a curved CRT.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
