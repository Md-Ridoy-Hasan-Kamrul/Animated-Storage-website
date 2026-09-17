import { ROUTES } from '../../../config';
import { WARP_FIELD_KEYCAP_DRIFT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'warp-field-keycap-drift',
  title: 'Keycap Drift Warp Field',
  category: 'Sections',
  categorySlug: 'sections',
  pricing: 'Free',
  likes: 1920,
  height: 'h-[272px]',
  livePath: ROUTES.WARP_FIELD_KEYCAP_DRIFT,
  detailPath: '/templates/warp-field-keycap-drift',
  fullPrompt: WARP_FIELD_KEYCAP_DRIFT_PROMPT,
  description:
    'Keycap Drift warp — 72 lit mechanical keycaps tumbling through a 900-spark particle wake.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
