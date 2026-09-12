import React from 'react';
import { JOIN_LABEL, SOCIAL_ICON_SIZE, SOCIAL_ICONS } from '../constants';
import { SOCIAL_ICON_MAP } from '../icons';

const SocialRow = () => (
  <div className="flex flex-wrap items-center gap-3">
    <span className="text-[10px] uppercase tracking-widest opacity-50">{JOIN_LABEL}</span>
    <div className="flex items-center gap-3">
      {SOCIAL_ICONS.map((name) => {
        const Icon = SOCIAL_ICON_MAP[name];
        return (
          <a
            key={name}
            href="#"
            aria-label={name}
            className="opacity-70 transition-colors hover:text-white hover:opacity-100"
          >
            <Icon size={SOCIAL_ICON_SIZE} />
          </a>
        );
      })}
    </div>
  </div>
);

export default SocialRow;
