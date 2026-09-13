import React, { memo } from 'react';
import { COPY_ICON_SIZE } from '../constants';

const CopyIcon = memo(() => (
  <svg
    width={COPY_ICON_SIZE}
    height={COPY_ICON_SIZE}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
    <rect x="1.5" y="1.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
  </svg>
));

CopyIcon.displayName = 'CopyIcon';

export default CopyIcon;
