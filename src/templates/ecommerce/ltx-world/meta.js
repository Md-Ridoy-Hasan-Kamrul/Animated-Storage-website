import { ROUTES } from '../../../config';
import { LTX_WORLD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './content';

export const meta = {
  id: 'ltx-world',
  title: 'LTX World',
  category: 'Ecommerce',
  categorySlug: 'ecommerce',
  pricing: 'Free',
  likes: 3750,
  height: 'h-[272px]',
  livePath: ROUTES.LTX_WORLD,
  detailPath: '/templates/ltx-world',
  fullPrompt: LTX_WORLD_PROMPT,
  description:
    'Click-driven LTX fashion stage with glass Scene / Lighting / Clothing / Cast clips.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
