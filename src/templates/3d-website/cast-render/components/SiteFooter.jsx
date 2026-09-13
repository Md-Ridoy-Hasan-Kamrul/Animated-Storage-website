import React, { memo } from 'react';
import { FOOTER_COPY } from '../constants';

const SiteFooter = memo(() => <footer className="foot">{FOOTER_COPY}</footer>);

SiteFooter.displayName = 'SiteFooter';

export default SiteFooter;
