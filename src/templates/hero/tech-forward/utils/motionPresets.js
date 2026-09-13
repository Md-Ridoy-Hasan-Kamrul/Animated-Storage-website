import {
  BUTTONS_DELAY_S,
  BUTTONS_DURATION_S,
  BUTTONS_Y,
  ENTRANCE_HIDDEN,
  ENTRANCE_VISIBLE,
  FOOTER_DELAY_S,
  FOOTER_DURATION_S,
  FOOTER_Y,
  HEADING_DELAY_S,
  HEADING_DURATION_S,
  HEADING_Y,
  MOTION_EASE,
  NAV_DURATION_S,
  NAV_Y,
  SUBTITLE_DELAY_S,
  SUBTITLE_DURATION_S,
  SUBTITLE_Y,
  TWEEN_TYPE,
  VIDEO_DURATION_S,
  VIDEO_FROM_OPACITY,
  VIDEO_FROM_SCALE,
} from '../constants';

const createTween = ({ duration, delay = 0 }) => ({
  type: TWEEN_TYPE,
  duration,
  delay,
  ease: MOTION_EASE,
});

const slideFade = (y, transition) => ({
  [ENTRANCE_HIDDEN]: { y, opacity: 0 },
  [ENTRANCE_VISIBLE]: { y: 0, opacity: 1, transition },
});

export const navVariants = slideFade(NAV_Y, createTween({ duration: NAV_DURATION_S }));

export const videoVariants = {
  [ENTRANCE_HIDDEN]: { opacity: VIDEO_FROM_OPACITY, scale: VIDEO_FROM_SCALE },
  [ENTRANCE_VISIBLE]: {
    opacity: 1,
    scale: 1,
    transition: createTween({ duration: VIDEO_DURATION_S }),
  },
};

export const footerVariants = slideFade(FOOTER_Y, createTween({ duration: FOOTER_DURATION_S, delay: FOOTER_DELAY_S }));

export const subtitleVariants = slideFade(
  SUBTITLE_Y,
  createTween({ duration: SUBTITLE_DURATION_S, delay: SUBTITLE_DELAY_S }),
);

export const headingVariants = slideFade(
  HEADING_Y,
  createTween({ duration: HEADING_DURATION_S, delay: HEADING_DELAY_S }),
);

export const buttonsVariants = slideFade(
  BUTTONS_Y,
  createTween({ duration: BUTTONS_DURATION_S, delay: BUTTONS_DELAY_S }),
);

export const entranceProps = (variants) => ({
  initial: ENTRANCE_HIDDEN,
  variants,
});

export const navMotion = {
  initial: navVariants[ENTRANCE_HIDDEN],
  animate: navVariants[ENTRANCE_VISIBLE],
  transition: navVariants[ENTRANCE_VISIBLE].transition,
};

export const videoMotion = {
  initial: videoVariants[ENTRANCE_HIDDEN],
  animate: videoVariants[ENTRANCE_VISIBLE],
  transition: videoVariants[ENTRANCE_VISIBLE].transition,
};

export const footerMotion = {
  initial: footerVariants[ENTRANCE_HIDDEN],
  animate: footerVariants[ENTRANCE_VISIBLE],
  transition: footerVariants[ENTRANCE_VISIBLE].transition,
};

export const subtitleMotion = {
  initial: subtitleVariants[ENTRANCE_HIDDEN],
  animate: subtitleVariants[ENTRANCE_VISIBLE],
  transition: subtitleVariants[ENTRANCE_VISIBLE].transition,
};

export const headingMotion = {
  initial: headingVariants[ENTRANCE_HIDDEN],
  animate: headingVariants[ENTRANCE_VISIBLE],
  transition: headingVariants[ENTRANCE_VISIBLE].transition,
};

export const buttonsMotion = {
  initial: buttonsVariants[ENTRANCE_HIDDEN],
  animate: buttonsVariants[ENTRANCE_VISIBLE],
  transition: buttonsVariants[ENTRANCE_VISIBLE].transition,
};
