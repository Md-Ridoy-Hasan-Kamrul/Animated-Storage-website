import { ROUTES } from '../../../config';
import { GLITCH_FALL_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'glitch-fall',
  title: 'Glitch Fall',
  category: 'Text Animation',
  categorySlug: 'text-animation',
  pricing: 'Free',
  likes: 2388,
  height: 'h-[272px]',
  livePath: ROUTES.GLITCH_FALL,
  detailPath: '/templates/glitch-fall',
  fullPrompt: GLITCH_FALL_PROMPT,
  description:
    'Broadcast colour torn into flat blocks and slipped rows, with the headline breaking up into two channels over a descending counter-orbit.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
