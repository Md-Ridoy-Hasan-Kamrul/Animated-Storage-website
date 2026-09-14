import React, { memo } from 'react';
import { LOGIN_ARROW_D } from '../constants';

const LoginArrow = memo(() => (
  <svg viewBox="0 0 22 22" className="login-arrow" aria-hidden="true" focusable="false">
    <path
      d={LOGIN_ARROW_D}
      fill="none"
      stroke="#fff"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

LoginArrow.displayName = 'LoginArrow';

export default LoginArrow;
