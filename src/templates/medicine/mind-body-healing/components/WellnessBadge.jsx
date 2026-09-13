import React, { memo } from 'react';
import { AVATAR_CLASS, AVATAR_STACK_CLASS, BADGE_CLASS, BADGE_LABEL, BADGE_TEXT_CLASS } from '../constants';
import { AVATARS } from '../content';

const WellnessBadge = memo(() => (
  <div className={BADGE_CLASS}>
    <div className={AVATAR_STACK_CLASS}>
      {AVATARS.map((avatar) => (
        <img
          key={avatar.remote}
          src={avatar.local}
          alt=""
          className={AVATAR_CLASS}
        />
      ))}
    </div>
    <span className={BADGE_TEXT_CLASS}>{BADGE_LABEL}</span>
  </div>
));

WellnessBadge.displayName = 'WellnessBadge';

export default WellnessBadge;
