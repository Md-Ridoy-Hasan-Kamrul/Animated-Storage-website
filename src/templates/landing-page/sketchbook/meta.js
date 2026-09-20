import { ROUTES } from '../../../config';
import { SKETCHBOOK_PROMPT } from './prompt';
import { PREVIEW_STILL, SOURCE_URL } from './constants';
import { SKETCHBOOK_SKILL, SKETCHBOOK_USAGE } from './sourceDocs';

export const meta = {
  id: 'sketchbook',
  title: 'Sketchbook',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 4120,
  height: 'h-[272px]',
  livePath: ROUTES.SKETCHBOOK,
  detailPath: '/templates/sketchbook',
  fullPrompt: SKETCHBOOK_PROMPT,
  description:
    'Singapore sketchbook portfolio — curled page turns, loupe, botanical paper, and editorial plates.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
  /** Details panel: Usage | Code | Skill.md (one Code source, not per-framework). */
  componentName: 'MengToSketchbookLandingPage',
  usage: SKETCHBOOK_USAGE,
  codeUrl: SOURCE_URL,
  skill: SKETCHBOOK_SKILL,
};

export default meta;
