import {
  FOOTER_RESERVE_PX,
  GUTTER_MAX_PX,
  GUTTER_MIN_PX,
  GUTTER_VIEW_RATIO,
  IMAGE_RATIO_H,
  IMAGE_RATIO_W,
  MASTHEAD_SHORT_PX,
  MASTHEAD_TALL_PX,
  MIN_VIEWPORT_HEIGHT_PX,
  MOBILE_MAX_PX,
  MOBILE_SIDE_GUTTER_PX,
  SHORT_DESKTOP_MAX_PX,
  TITLE_RESERVE_DESKTOP_PX,
  TITLE_RESERVE_MOBILE_PX,
} from '../constants';

export function measureImagePlane(stageWidth, viewportHeight, options = {}) {
  if (options.framed) {
    const width = stageWidth;
    const height = (width * IMAGE_RATIO_H) / IMAGE_RATIO_W;
    return { width, height, left: 0, top: 0 };
  }

  const mobile = stageWidth <= MOBILE_MAX_PX;
  const mediaHeight =
    Math.max(MIN_VIEWPORT_HEIGHT_PX, viewportHeight) -
    (viewportHeight <= SHORT_DESKTOP_MAX_PX ? MASTHEAD_SHORT_PX : MASTHEAD_TALL_PX) -
    FOOTER_RESERVE_PX -
    TITLE_RESERVE_DESKTOP_PX;
  const width = mobile
    ? stageWidth - MOBILE_SIDE_GUTTER_PX
    : Math.min(
        stageWidth - 2 * Math.min(GUTTER_MAX_PX, Math.max(GUTTER_MIN_PX, stageWidth * GUTTER_VIEW_RATIO)),
        (mediaHeight * IMAGE_RATIO_W) / IMAGE_RATIO_H,
      );
  const height = (width * IMAGE_RATIO_H) / IMAGE_RATIO_W;
  return {
    width,
    height,
    left: (stageWidth - width) / 2,
    top: mobile ? TITLE_RESERVE_MOBILE_PX : TITLE_RESERVE_DESKTOP_PX,
  };
}
