import {
  PAPER_VARIANT,
  PAPER_VARIANTS,
  SOURCE_URL,
  VARIANT_BACKGROUND,
  VARIANT_TITLES,
} from './constants';

export function resolvePaperVariant(variant) {
  const safe = PAPER_VARIANTS.includes(variant) ? variant : PAPER_VARIANT;
  return {
    variant: safe,
    label: VARIANT_TITLES[safe],
    background: VARIANT_BACKGROUND,
    source: SOURCE_URL,
  };
}
