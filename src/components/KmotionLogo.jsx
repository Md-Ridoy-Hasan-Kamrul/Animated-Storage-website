import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config';

const LOGO_SRC = '/images/kmotion.png';

/** Official KMOTION PNG wordmark */
export const KmotionLogo = memo(({ className = '', height = 32 }) => (
  <img
    src={LOGO_SRC}
    alt="KMOTION"
    height={height}
    className={`max-w-[58vw] w-auto object-contain object-left sm:max-w-none ${className}`}
    style={{ height, width: 'auto' }}
    draggable={false}
  />
));

KmotionLogo.displayName = 'KmotionLogo';

export const KmotionLogoLink = memo(({ onClick, height = 32, className = '' }) => (
  <Link
    to={ROUTES.HOME}
    onClick={onClick}
    className={`inline-flex shrink-0 items-center ${className}`}
    aria-label="Kmotion home"
  >
    <KmotionLogo height={height} />
  </Link>
));

KmotionLogoLink.displayName = 'KmotionLogoLink';
