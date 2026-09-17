import { ROUTES } from '../../../config';
import { TERMINAL_CRT_PROMPT } from './prompt';
import { PREVIEW_STILL } from './constants';

export const meta = {
  id: 'terminal-crt',
  title: 'Terminal CRT',
  category: 'Background',
  categorySlug: 'background',
  pricing: 'Free',
  likes: 2310,
  height: 'h-[272px]',
  livePath: ROUTES.TERMINAL_CRT,
  detailPath: '/templates/terminal-crt',
  fullPrompt: TERMINAL_CRT_PROMPT,
  description:
    '19-row Zion boot log typing onto green phosphor behind a curved CRT grille at full backing resolution.',
  previewImage: PREVIEW_STILL,
  previewGif: PREVIEW_STILL,
};

export default meta;
