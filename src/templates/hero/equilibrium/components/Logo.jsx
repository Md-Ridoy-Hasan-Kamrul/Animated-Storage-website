import React, { memo } from 'react';
import { Infinity } from 'lucide-react';
import { BRAND_NAME, LOGO_CLASS, LOGO_ICON_SIZE, LOGO_ICON_STROKE } from '../constants';

const Logo = memo(() => (
  <div className={LOGO_CLASS}>
    <Infinity size={LOGO_ICON_SIZE} strokeWidth={LOGO_ICON_STROKE} />
    <span>{BRAND_NAME}</span>
  </div>
));

Logo.displayName = 'Logo';

export default Logo;
