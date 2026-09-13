import {
  COPY_DELAY_S,
  COPY_DURATION_S,
  COPY_Y,
  MOTION_EASE,
  NAV_DURATION_S,
  NAV_Y,
  STATS_DELAY_S,
  VIDEO_DURATION_S,
  VIDEO_FROM_SCALE,
} from '../constants';

export const videoMotion = {
  initial: { opacity: 0, scale: VIDEO_FROM_SCALE },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: VIDEO_DURATION_S, ease: MOTION_EASE },
};

export const navMotion = {
  initial: { opacity: 0, y: NAV_Y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: NAV_DURATION_S, ease: MOTION_EASE },
};

export const copyMotion = {
  initial: { opacity: 0, y: COPY_Y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: COPY_DURATION_S, delay: COPY_DELAY_S, ease: MOTION_EASE },
};

export const statsMotion = {
  initial: { opacity: 0, y: COPY_Y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: COPY_DURATION_S, delay: STATS_DELAY_S, ease: MOTION_EASE },
};
