import React, { memo } from 'react';
import {
  HEADER_META_PRIMARY,
  HEADER_META_SECONDARY,
  TRY_NOW_HREF,
  TRY_NOW_LABEL,
} from '../constants';
import LtxLogo from './LtxLogo';

const LtxHeader = memo(() => (
  <header className="ltx-header">
    <div className="ltx-header-left">
      <a className="ltx-logo" href="#home" aria-label="LTX home">
        <LtxLogo />
      </a>
      <div className="meta">
        <span>{HEADER_META_PRIMARY}</span>
        <span className="meta-secondary">{HEADER_META_SECONDARY}</span>
      </div>
    </div>
    <span />
    <a
      className="try-now"
      href={TRY_NOW_HREF}
      target="_blank"
      rel="noopener noreferrer"
    >
      {TRY_NOW_LABEL}
    </a>
  </header>
));

LtxHeader.displayName = 'LtxHeader';

export default LtxHeader;
