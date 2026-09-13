import React, { memo } from 'react';
import { CircleUserRound } from 'lucide-react';
import {
  ACCOUNT_CIRCLE_CLASS,
  ACCOUNT_DESKTOP_CLASS,
  ACCOUNT_ICON_CLASS,
  ACCOUNT_ICON_SIZE,
  ACCOUNT_ICON_STROKE,
  ACCOUNT_LABEL,
  ACCOUNT_ROW_CLASS,
  ACCOUNT_TEXT_CLASS,
} from '../constants';

const AccountIcon = () => (
  <CircleUserRound
    size={ACCOUNT_ICON_SIZE}
    strokeWidth={ACCOUNT_ICON_STROKE}
    className={ACCOUNT_ICON_CLASS}
  />
);

const AccountChip = memo(({ variant = 'desktop', onClick }) => {
  if (variant === 'mobile') {
    return (
      <button type="button" className={ACCOUNT_ROW_CLASS} onClick={onClick}>
        <span className={ACCOUNT_CIRCLE_CLASS}>
          <AccountIcon />
        </span>
        <span className={ACCOUNT_TEXT_CLASS}>{ACCOUNT_LABEL}</span>
      </button>
    );
  }

  return (
    <button type="button" className={ACCOUNT_DESKTOP_CLASS} aria-label={ACCOUNT_LABEL}>
      <AccountIcon />
    </button>
  );
});

AccountChip.displayName = 'AccountChip';

export default AccountChip;
