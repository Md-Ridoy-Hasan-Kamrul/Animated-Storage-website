import {
  FADE_SPAN,
  S1_HOLD,
  S2_HOLD,
  S2_IN,
  S2_OUT,
  S3_HOLD,
  S3_IN,
} from '../constants';

export function s1Opacity(progress) {
  if (progress < S1_HOLD) return 1;
  return Math.max(0, 1 - (progress - S1_HOLD) / FADE_SPAN);
}

export function s2Opacity(progress) {
  if (progress < S2_IN) return 0;
  if (progress < S2_HOLD) return (progress - S2_IN) / FADE_SPAN;
  if (progress < S2_OUT) return 1;
  return Math.max(0, 1 - (progress - S2_OUT) / FADE_SPAN);
}

export function s3Opacity(progress) {
  if (progress < S3_IN) return 0;
  if (progress < S3_HOLD) return (progress - S3_IN) / FADE_SPAN;
  return 1;
}

export function isStaggerVisible(sectionOpacity, threshold) {
  return sectionOpacity > threshold;
}

export function isNavLight(progress, flipAt) {
  return progress <= flipAt;
}
