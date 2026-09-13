import React, { memo } from 'react';
import {
  FEATURE_DESKTOP_WRAP_CLASS,
  FEATURE_MOBILE_WRAP_CLASS,
  FEATURE_PILLS,
  FEATURE_VARIANT,
} from '../constants';

const WRAP_BY_VARIANT = {
  mobile: FEATURE_MOBILE_WRAP_CLASS,
  desktop: FEATURE_DESKTOP_WRAP_CLASS,
};

const FeaturePills = memo(({ variant }) => (
  <div className={WRAP_BY_VARIANT[variant]}>
    {FEATURE_PILLS.map((label) => (
      <span key={label} className={FEATURE_VARIANT[variant]}>
        {label}
      </span>
    ))}
  </div>
));

FeaturePills.displayName = 'FeaturePills';

export default FeaturePills;
