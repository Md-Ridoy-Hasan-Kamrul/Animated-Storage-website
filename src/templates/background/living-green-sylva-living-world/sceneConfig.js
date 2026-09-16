import {
  FRAME_TITLE,
  SOURCE_URL,
  SYLVA_LIVING_WORLD_VARIANTS,
  VARIANT_BACKGROUNDS,
  VARIANT_DOCUMENT_SRC,
  VARIANT_LABELS,
} from './constants';

export function resolveSylvaVariant(variant) {
  return SYLVA_LIVING_WORLD_VARIANTS.includes(variant) ? variant : 'living-green';
}

export function resolveSceneSource(variant, documentSrc) {
  if (documentSrc) return documentSrc;
  return VARIANT_DOCUMENT_SRC[variant] || SOURCE_URL;
}

export function resolveSceneChrome(variant) {
  return {
    label: VARIANT_LABELS[variant] ?? FRAME_TITLE,
    background: VARIANT_BACKGROUNDS[variant] ?? VARIANT_BACKGROUNDS['living-green'],
  };
}
