import {
  PAPER_VARIANTS,
  SOURCE_URL,
  VARIANT_BACKGROUND,
  VARIANT_TITLES,
} from './constants';

export function resolvePaperVariant(variant) {
  const safe = PAPER_VARIANTS.includes(variant) ? variant : 'original';
  return {
    variant: safe,
    label: VARIANT_TITLES[safe],
    background: VARIANT_BACKGROUND,
    source: SOURCE_URL,
  };
}
