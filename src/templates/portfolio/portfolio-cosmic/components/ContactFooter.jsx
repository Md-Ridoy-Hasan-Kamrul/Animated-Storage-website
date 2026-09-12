import React, { useMemo, useRef } from 'react';
import HlsBackgroundVideo from './HlsBackgroundVideo';
import AccentButton from './AccentButton';
import { useMarquee } from '../hooks/useMarquee';
import {
  CONTACT_EMAIL,
  MARQUEE_REPEAT,
  MARQUEE_TEXT,
  SOCIAL_LINKS,
} from '../constants';

const ContactFooter = ({ animate = true }) => {
  const trackRef = useRef(null);
  useMarquee(trackRef, animate);

  const marqueeCopy = useMemo(
    () => Array.from({ length: MARQUEE_REPEAT }, () => MARQUEE_TEXT).join(''),
    [],
  );

  return (
    <footer className="pc-bg relative overflow-hidden pt-16 md:pt-20 pb-8 md:pb-12">
      <HlsBackgroundVideo flipY overlayClassName="bg-black/60" />

      <div className="relative z-10">
        <div className="overflow-hidden py-8">
          <div
            ref={trackRef}
            className="pc-font-display flex w-max whitespace-nowrap text-4xl italic text-[hsl(var(--text)/0.85)] md:text-6xl lg:text-7xl"
          >
            <span>{marqueeCopy}</span>
            <span aria-hidden>{marqueeCopy}</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6 pb-10 md:px-10 lg:px-16">
          <AccentButton href={`mailto:${CONTACT_EMAIL}`} variant="outline">
            {CONTACT_EMAIL}
          </AccentButton>

          <div className="flex w-full flex-col items-center justify-between gap-6 border-t border-[hsl(var(--stroke))] pt-8 sm:flex-row">
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pc-muted text-sm transition-colors hover:text-[hsl(var(--text))]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="pc-muted flex items-center gap-2 text-sm">
              <span
                className="relative flex h-2.5 w-2.5"
                aria-hidden
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for projects
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
