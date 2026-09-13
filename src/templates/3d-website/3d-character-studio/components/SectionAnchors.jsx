import React, { memo } from 'react';
import { CTA_HREF, NAV_LINKS } from '../constants';
import { idFromHref } from '../utils/sectionId';

const SectionAnchors = memo(() => (
  <>
    {NAV_LINKS.map((link) => (
      <div key={link.href} id={idFromHref(link.href)} className="sr-only" />
    ))}
    <div id={idFromHref(CTA_HREF)} className="sr-only" />
  </>
));

SectionAnchors.displayName = 'SectionAnchors';

export default SectionAnchors;
