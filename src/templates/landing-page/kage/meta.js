import { ROUTES } from '../../../config';
import { KAGE_PROMPT } from './prompt';
import { PREVIEW_STILL, SOURCE_URL } from './constants';
import { KAGE_SKILL, KAGE_USAGE } from './sourceDocs';

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
  /** Details panel: Usage | Code | Skill.md (one Code source, not per-framework). */
  componentName: 'KageLandingPage',
  usage: KAGE_USAGE,
  codeUrl: SOURCE_URL,
  skill: KAGE_SKILL,
};

export default meta;
