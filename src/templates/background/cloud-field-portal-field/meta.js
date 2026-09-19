import { ROUTES } from '../../../config';
import { CLOUD_FIELD_PORTAL_FIELD_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'cloud-field-portal-field',
  title: 'Cloud Field Portal Field',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2590,
  height: 'h-[272px]',
  livePath: ROUTES.CLOUD_FIELD_PORTAL_FIELD,
  detailPath: '/templates/cloud-field-portal-field',
  fullPrompt: CLOUD_FIELD_PORTAL_FIELD_PROMPT,
  description:
    'A raw-WebGL cloud migration background isolated at its source renderer boundary.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
