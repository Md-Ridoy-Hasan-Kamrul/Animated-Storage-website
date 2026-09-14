import React, { memo } from 'react';
import { MAIL_ICON_H, MAIL_ICON_W, MAIL_STROKE } from '../constants';

const MailIcon = memo(() => (
  <svg
    width={MAIL_ICON_W}
    height={MAIL_ICON_H}
    viewBox={`0 0 ${MAIL_ICON_W} ${MAIL_ICON_H}`}
    fill="none"
    aria-hidden="true"
  >
    <rect
      x={MAIL_STROKE / 2}
      y={MAIL_STROKE / 2}
      width={MAIL_ICON_W - MAIL_STROKE}
      height={MAIL_ICON_H - MAIL_STROKE}
      stroke="currentColor"
      strokeWidth={MAIL_STROKE}
    />
    <path
      d={`M${MAIL_STROKE} ${MAIL_STROKE + 0.4} L${MAIL_ICON_W / 2} ${MAIL_ICON_H / 2 + 1} L${MAIL_ICON_W - MAIL_STROKE} ${MAIL_STROKE + 0.4}`}
      stroke="currentColor"
      strokeWidth={MAIL_STROKE}
    />
  </svg>
));

MailIcon.displayName = 'MailIcon';

export default MailIcon;
