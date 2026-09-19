/** Spark Badge — host + provenance constants. */

export const CARD_ID = 'spark-badge';
export const CARD_TITLE = 'Spark Badge';
export const PAGE_TITLE = 'Spark Badge — Kmotion';
export const DETAIL_FALLBACK = '/templates/spark-badge';

export const PAGE_CLASS = 'spark-badge-page';
export const PAGE_HTML_CLASS = 'spark-badge-html';
export const FRAMED_HTML_CLASS = 'spark-badge-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'spark-badge';
export const FRAME_CLASS = 'spark-badge__frame';

export const PAGE_BG = '#000000';
export const PAGE_INK = '#f5f5f5';
export const HOST_BACKGROUND = '#000000';

export const FRAME_SANDBOX = 'allow-scripts';
export const FRAME_TITLE = 'Animated credential badge in rain';
export const HOST_ARIA_LABEL = 'Interactive Spark Badge credential in rain';
export const HOST_ROLE = 'group';

/** CSP-safe public URL (srcDoc inline scripts are blocked). */
export const SOURCE_URL = '/effects/spark-badge.html';
export const SOURCE_REVISION = 'a8eefdee0d87';
export const VARIANT_ID = 'badge';

export const SPARK_BADGE_COMPONENT_SHA256 =
  '2968baef448957765473ccd031f4337d376dbace5e8ec5434d0a57299ffecdda';
export const SPARK_BADGE_HTML_SHA256 =
  'a8eefdee0d87deefae9b8b8dac4d79c0ee41447578a78090cad9c956e33ccf90';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const SPARK_BADGE_COMPONENT_BYTES = 3960;
export const SPARK_BADGE_HTML_BYTES = 38119;
export const THREEUI_CSS_BYTES = 40715;

export const SPARK_BADGE_DEFAULT_PROPS = {
  speed: 1,
  particleAmount: 1,
  rainAmount: 1,
  turbulence: 1,
  spread: 1,
};

export const INTERSECTION_ROOT_MARGIN = '80px';

const SRC = 'src/templates/background/spark-badge/sources';

export const ASSET_MANIFEST = [
  {
    path: `${SRC}/SparkBadge.tsx.txt`,
    bytes: SPARK_BADGE_COMPONENT_BYTES,
    sha256: SPARK_BADGE_COMPONENT_SHA256,
  },
  {
    path: `${SRC}/spark-badge.html`,
    bytes: SPARK_BADGE_HTML_BYTES,
    sha256: SPARK_BADGE_HTML_SHA256,
  },
  {
    path: `${SRC}/threeui.css`,
    bytes: THREEUI_CSS_BYTES,
    sha256: THREEUI_CSS_SHA256,
  },
  {
    path: 'public/effects/spark-badge.html',
    bytes: SPARK_BADGE_HTML_BYTES,
    sha256: SPARK_BADGE_HTML_SHA256,
  },
];

export const PREVIEW_STILL = '/images/Assets%20Spark%20Badge/SparkBadge.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
