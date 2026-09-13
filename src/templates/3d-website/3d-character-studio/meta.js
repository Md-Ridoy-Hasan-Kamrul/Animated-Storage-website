import { ROUTES } from '../../../config';
import { MAINFRAME_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: '3d-character-studio',
  title: '3D Character Studio',
  category: '3d Website',
  categorySlug: '3d-website',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.CHARACTER_STUDIO,
  detailPath: '/templates/3d-character-studio',
  fullPrompt: MAINFRAME_PROMPT,
  description:
    'Mainframe hero with mouse-scrubbed character film, typewriter copy, and liquid action pills.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
