import { ROUTES } from '../../../config';
import { SUBLEVEL_STUDIO_PROMPT } from './prompt';
import { PREVIEW_STILL, SOURCE_URL } from './constants';
import { SUBLEVEL_STUDIO_SKILL, SUBLEVEL_STUDIO_USAGE } from './sourceDocs';

export const meta = {
  id: 'sublevel-studio',
  title: 'Sublevel Studio',
  category: 'Landing Page',
  categorySlug: 'landing-page',
  pricing: 'Free',
  likes: 3680,
  height: 'h-[272px]',
  livePath: ROUTES.SUBLEVEL_STUDIO,
  detailPath: '/templates/sublevel-studio',
  fullPrompt: SUBLEVEL_STUDIO_PROMPT,
  description:
    'Black-and-white studio OS — modular project cells, floating dock, diagnostics, lab experiments, and terminal contact.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
  /** Details panel: Usage | Code | Skill.md (one Code source, not per-framework). */
  componentName: 'SublevelStudioLandingPage',
  usage: SUBLEVEL_STUDIO_USAGE,
  codeUrl: SOURCE_URL,
  skill: SUBLEVEL_STUDIO_SKILL,
};

export default meta;
