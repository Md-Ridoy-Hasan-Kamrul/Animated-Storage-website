import React, { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  BACK_BUTTON_CLASS,
  BACK_ICON_SIZE,
  BACK_ICON_STROKE,
  BACK_LABEL,
} from '../constants';

const BackButton = memo(({ onBack }) => (
  <button type="button" className={BACK_BUTTON_CLASS} onClick={onBack} aria-label="Go back">
    <ArrowLeft size={BACK_ICON_SIZE} strokeWidth={BACK_ICON_STROKE} />
    {BACK_LABEL}
  </button>
));

BackButton.displayName = 'BackButton';

export default BackButton;
