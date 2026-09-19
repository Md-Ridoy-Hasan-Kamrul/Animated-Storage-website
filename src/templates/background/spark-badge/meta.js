import { ROUTES } from '../../../config';
import { SPARK_BADGE_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'spark-badge',
  title: 'Spark Badge',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2360,
  height: 'h-[272px]',
  livePath: ROUTES.SPARK_BADGE,
  detailPath: '/templates/spark-badge',
  fullPrompt: SPARK_BADGE_PROMPT,
  description:
    'Codex credential badge assembled from luminous rain and curl-noise embers on Canvas 2D.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
