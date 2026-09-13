import { ROUTES } from '../../../config';
import { VELORAH_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'velorah',
  title: 'Velorah',
  category: 'Agency',
  categorySlug: 'agency',
  pricing: 'Free',
  likes: 366,
  height: 'h-[272px]',
  livePath: ROUTES.VELORAH,
  detailPath: '/templates/velorah',
  fullPrompt: VELORAH_PROMPT,
  description:
    'Cinematic Agency hero with looping video, Instrument Serif, and liquid-glass CTAs.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
