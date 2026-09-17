/** Override Grid Predictive Arc — host + provenance constants. */

export const CARD_ID = 'override-grid-predictive-arc';
export const CARD_TITLE = 'Override Grid Predictive Arc';
export const PAGE_TITLE = 'Override Grid Predictive Arc — Kmotion';
export const DETAIL_FALLBACK = '/templates/override-grid-predictive-arc';

export const PAGE_CLASS = 'override-grid-predictive-arc-page';
export const PAGE_HTML_CLASS = 'override-grid-predictive-arc-html';
export const FRAMED_HTML_CLASS = 'override-grid-predictive-arc-framed';
export const SHADER_FRAME_CLASS = 'shader-frame';
export const HOST_CLASS = 'threeui-background override-grid-predictive-arc';
export const FRAME_CLASS = 'override-grid-predictive-arc__frame';

export const PAGE_BG = '#050505';
export const PAGE_INK = '#f97316';
export const HOST_BACKGROUND = '#050505';

export const FRAME_SANDBOX = 'allow-scripts';
export const FRAME_TITLE = 'Override Grid';
export const HOST_ARIA_LABEL = 'Interactive Override Grid predictive arc field';
export const HOST_ROLE = 'group';

export const SOURCE_URL = '/effects/override-grid-predictive-arc.html';
export const SOURCE_REVISION = 'fa86582fc870';
export const VARIANT_ID = 'override-grid';

export const DEFAULT_SIZE = 48;
export const DEFAULT_GAP = 2;
export const DEFAULT_MODE = 'dark';
export const DEFAULT_SPEED = 1;
export const DEFAULT_HUE = 0;
export const DEFAULT_SATURATION = 1;
export const DEFAULT_BRIGHTNESS = 1;

export const HUE_MIN = -180;
export const HUE_MAX = 180;
export const SATURATION_MIN = 0;
export const SATURATION_MAX = 2;
export const BRIGHTNESS_MIN = 0.35;
export const BRIGHTNESS_MAX = 1.65;

export const OVERRIDE_GRID_HTML_SHA256 =
  'dc7800f2b6b6329b8b71ea4a06b82af91cff8379701c6a7fa4c9a92d47f89d6c';
export const PREDICTIVE_ARC_COLLECTION_SHA256 =
  'b77a845ab2fa8e8ef8d9b6812d71efe6f320d865d97ec97b2e15253b5950fd63';
export const PREDICTIVE_ARC_CANVAS_SHA256 =
  'ebaa5a1b1f785c7772aaedc2b195318fd63bd9c3e5e5d8e175600968b245dae7';
export const PREDICTIVE_ARC_RENDERER_SHA256 =
  'fc08c66b13c4a8173c8a88845926b72266d1b1a4fc345c84f44ee61fbfaba92b';
export const DATA_PIXEL_ARC_CANVAS_SHA256 =
  '2e25156d43dfd1bf0fb47384f75df240cd0c4038deae75a8dacae7c213269c5b';
export const DATA_PIXEL_ARC_RENDERER_SHA256 =
  '65bdfb98424996d935923f39f163e1667f0bc2b8faa458d900f4450beabba0eb';
export const NEUFORM_BATCH_EFFECTS_SHA256 =
  'dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f';
export const AMBER_HALFTONE_SHA256 =
  '3d9ebb64a15a1985c4cef1f01457281a49b2d9900405fd674e8748cac8af00a0';
export const SIGNAL_PARTICLES_SHA256 =
  '613a2005d18795dbc25a5d0f93c3ae4dfecdfcb939ea6e2c5702b82eb1e4bfff';
export const RIBBON_FIELD_BACKGROUND_SHA256 =
  'fab02cb57c44c7307afd29cd03d01141372ad90163632b9a6a77910a245a5996';
export const RIBBON_FIELD_SHADERS_SHA256 =
  'ab578acab44bbff7f3cf67f1c82b3e2e1d03689de3fcbdc23681e8b5a0a3536c';
export const NEUFORM_ISOLATED_EFFECTS_SHA256 =
  'fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75';
export const VOID_PROTOCOL_SHA256 =
  'affd21553ba951c0ff0f5a8e40a84ae70d49aaff3c4c69ea4ae1ec897dec21e3';
export const NEUFORM_CRAFT_EFFECTS_SHA256 =
  '0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450';
export const NEXUS_UNIFIED_FLOW_SHA256 =
  'fa1a015ae407dc2091c3c96239d28107e973cbc03aa7abef37dd5da791d5428b';
export const THREEUI_CSS_SHA256 =
  'efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf';

export const FOCUSED_DOCUMENT_SHA256 =
  '989dd75a8188ba1ad0552ae990bf9dce4d372e3cfbde7726c31b06db4762b099';
export const FOCUSED_DOCUMENT_BYTES = 18873;

export const INTERSECTION_ROOT_MARGIN = '80px';

const SRC = 'src/templates/background/override-grid-predictive-arc/sources';

export const ASSET_MANIFEST = [
  { path: `${SRC}/PredictiveArcCollection.tsx.txt`, bytes: 2860, sha256: PREDICTIVE_ARC_COLLECTION_SHA256 },
  { path: `${SRC}/PredictiveArcCanvas.tsx.txt`, bytes: 4365, sha256: PREDICTIVE_ARC_CANVAS_SHA256 },
  { path: `${SRC}/predictiveArcRenderer.ts.txt`, bytes: 4088, sha256: PREDICTIVE_ARC_RENDERER_SHA256 },
  { path: `${SRC}/DataPixelArcCanvas.tsx.txt`, bytes: 2376, sha256: DATA_PIXEL_ARC_CANVAS_SHA256 },
  { path: `${SRC}/dataPixelArcRenderer.ts.txt`, bytes: 4372, sha256: DATA_PIXEL_ARC_RENDERER_SHA256 },
  { path: `${SRC}/NeuformBatchEffects.tsx.txt`, bytes: 41426, sha256: NEUFORM_BATCH_EFFECTS_SHA256 },
  { path: `${SRC}/amber-halftone.html`, bytes: 16324, sha256: AMBER_HALFTONE_SHA256 },
  { path: `${SRC}/signal-particles.html`, bytes: 33027, sha256: SIGNAL_PARTICLES_SHA256 },
  { path: `${SRC}/override-grid.html`, bytes: 14421, sha256: OVERRIDE_GRID_HTML_SHA256 },
  { path: `${SRC}/RibbonFieldBackground.tsx.txt`, bytes: 4717, sha256: RIBBON_FIELD_BACKGROUND_SHA256 },
  { path: `${SRC}/ribbonFieldShaders.ts.txt`, bytes: 2907, sha256: RIBBON_FIELD_SHADERS_SHA256 },
  { path: `${SRC}/NeuformIsolatedEffects.tsx.txt`, bytes: 93888, sha256: NEUFORM_ISOLATED_EFFECTS_SHA256 },
  { path: `${SRC}/void-protocol.html`, bytes: 21426, sha256: VOID_PROTOCOL_SHA256 },
  { path: `${SRC}/NeuformCraftEffects.tsx.txt`, bytes: 10720, sha256: NEUFORM_CRAFT_EFFECTS_SHA256 },
  { path: `${SRC}/nexus-unified-flow.html`, bytes: 15094, sha256: NEXUS_UNIFIED_FLOW_SHA256 },
  { path: `${SRC}/threeui.css`, bytes: 40715, sha256: THREEUI_CSS_SHA256 },
  {
    path: 'public/effects/override-grid-predictive-arc.html',
    bytes: FOCUSED_DOCUMENT_BYTES,
    sha256: FOCUSED_DOCUMENT_SHA256,
  },
];

export const PREVIEW_STILL =
  '/images/Assets%20Override%20Grid%20Predictive%20Arc/OverrideGridPredictiveArc.png';

export const BACK_BUTTON_CLASS =
  'absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-[#f97316] backdrop-blur-md transition hover:bg-black/55';
export const BACK_ICON_SIZE = 16;
export const BACK_ICON_STROKE = 2;
export const BACK_LABEL = 'Back';
export const HISTORY_CAN_GO_BACK_MIN = 0;
