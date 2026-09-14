import { EMBED_POSE_HOLD_MS, EMBED_POSE_REST_MS, PREVIEW_POSES } from '../constants';

export function nextPreviewPose(index) {
  return PREVIEW_POSES[(index + 1) % PREVIEW_POSES.length];
}

export function previewPoseDelay(pose, holdMs = EMBED_POSE_HOLD_MS, restMs = EMBED_POSE_REST_MS) {
  return pose ? holdMs : restMs;
}
