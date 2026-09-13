import React, { memo } from 'react';
import { BRAND_MARK, BRAND_NAME } from '../constants';

const BrandMark = memo(() => (
  <div className="flex items-center gap-3">
    <span className="mainframe-logo text-[21px] tracking-tight text-white sm:text-[26px]">
      {BRAND_NAME}
    </span>
    <span className="mainframe-mark select-none text-[25px] text-white sm:text-[30px]" aria-hidden="true">
      {BRAND_MARK}
    </span>
  </div>
));

BrandMark.displayName = 'BrandMark';

export default BrandMark;
