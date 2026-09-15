import { ROUTES } from '../../../config';
import { KAGE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'kage',
  title: 'KAGE',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 4890,
  height: 'h-[272px]',
  livePath: ROUTES.KAGE,
  detailPath: '/templates/kage',
  fullPrompt: KAGE_PROMPT,
  description:
    'Kyoto mountain-temple night walk — full HTML + Three.js sanctuary with scroll chapters and vermilion moon.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
