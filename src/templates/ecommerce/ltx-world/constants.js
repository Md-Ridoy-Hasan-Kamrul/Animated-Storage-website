export const DETAIL_FALLBACK = '/templates/ltx-world';
export const PAGE_TITLE = 'LTX — The world model';
export const PAGE_BG = '#000000';
export const PAGE_INK = '#ffffff';

export const MEDIA_BASE =
  'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/';

export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap';
export const FONT_LINK_ID = 'ltx-world-fonts';

export const TRY_NOW_HREF = 'https://app.ltx.io/';
export const HEADER_META_PRIMARY = 'LTX-2.5 is here';
export const HEADER_META_SECONDARY = 'Smarter. Faster';
export const TRY_NOW_LABEL = 'Try now';
export const SELECT_LABEL = 'Select state →';
export const RESET_LABEL = 'Reset';
export const RETRY_LABEL = 'Retry';

export const HERO_TITLE_WORDS = Object.freeze(['The', 'world', 'model']);
export const HERO_SUBTEXT =
  'LTX builds open world models that give you full control, from production-grade video to systems that understand and operate in the physical world.';

export const FIRST_FRAME_TIMEOUT_MS = 12000;
export const SEEK_EPSILON_S = 0.001;
export const FIRST_FRAME_MEDIA_TIME_MAX_S = 0.5;
export const READY_STATE_HAVE_CURRENT_DATA = 2;
export const COLLAPSE_MS = 980;
export const LABEL_FADE_MS = 420;
export const REAR_FADE_DELAY_MS = 650;
export const TITLE_WORD_STAGGER_MS = 90;
export const RESET_REVEAL_MS = 520;
export const RESTORE_LABELS_MS = 760;
export const RESTORE_LABELS_DELAY_MS = 60;
export const CAPSULE_HOVER_MS = 620;
export const DETAIL_CARD_IMAGE_COUNT = 8;
export const BACK_ICON_SIZE = 16;
export const ANNOUNCE_LOADING = 'Loading scene clips.';
export const ANNOUNCE_READY = 'Scene ready. Select a state.';
export const ANNOUNCE_ERROR = 'Transition error. Retry available.';
export const ANNOUNCE_RESET_ERROR = 'Reset error. Retry available.';
export const ANNOUNCE_BASE = 'Back at base scene.';
export const STATUS_FORWARD_ERROR = 'Transition failed. Retry to continue.';
export const STATUS_REVERSE_ERROR = 'Reset failed. Retry to continue.';
export const LOGO_HEIGHT_PX = 24;
export const CONTROLLER_HEIGHT_PX = 72;

export const BRANCHES = Object.freeze([
  {
    id: 'scene',
    label: 'Scene',
    forwardFile: 'video-2.mp4',
    reverseFile: 'video-2-reverse.mp4',
    forwardDuration: 2.08,
    reverseDuration: 2.08,
  },
  {
    id: 'light',
    label: 'Lighting',
    forwardFile: 'video-3.mp4',
    reverseFile: 'video-3-reverse.mp4',
    forwardDuration: 2.08,
    reverseDuration: 2.04,
  },
  {
    id: 'colorway',
    label: 'Clothing',
    forwardFile: 'video-1.mp4',
    reverseFile: 'video-1-reverse.mp4',
    forwardDuration: 2.08,
    reverseDuration: 2.08,
  },
  {
    id: 'fullLook',
    label: 'Cast',
    forwardFile: 'video-4.mp4',
    reverseFile: 'video-4-reverse.mp4',
    forwardDuration: 3,
    reverseDuration: 2.48,
  },
]);

export const CLIP_KEYS = Object.freeze(
  BRANCHES.flatMap((branch) => [
    `${branch.id}-forward`,
    `${branch.id}-reverse`,
  ]),
);

export const BASE_CLIP_KEY = 'colorway-forward';
