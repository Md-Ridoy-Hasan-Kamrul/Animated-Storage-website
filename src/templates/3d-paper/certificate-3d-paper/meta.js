import { ROUTES } from '../../../config';
import { CERTIFICATE_3D_PAPER_PROMPT } from './prompt';
import { CARD_TITLE, PREVIEW_STILL } from './constants';

export const meta = {
  id: 'certificate-3d-paper',
  title: CARD_TITLE,
  category: '3D Paper',
  categorySlug: '3d-paper',
  pricing: 'Free',
  likes: 0,
  height: 'h-[272px]',
  livePath: ROUTES.CERTIFICATE_3D_PAPER,
  detailPath: '/templates/certificate-3d-paper',
  fullPrompt: CERTIFICATE_3D_PAPER_PROMPT,
  description:
    'Formal typographic certificate with recipient signatures, structured award details, glass-like reflections, and translucent paper motion.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
