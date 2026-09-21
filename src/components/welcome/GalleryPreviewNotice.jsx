import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { TypographyVortexCanvas } from '../../effects/typography-vortex';
import {
  GALLERY_PREVIEW_NOTICE,
  GALLERY_PREVIEW_NOTICE_STORAGE_KEY,
} from './galleryPreviewNoticeCopy';
import './galleryPreviewNotice.css';
import TactileButton from '../ui/TactileButton';

function readDismissed() {
  try {
    return window.localStorage.getItem(GALLERY_PREVIEW_NOTICE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * First-visit modal: vortex backdrop + clear instructions for gallery vs full View mode.
 */
export function GalleryPreviewNotice() {
  const titleId = useId();
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !readDismissed();
  });

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(GALLERY_PREVIEW_NOTICE_STORAGE_KEY, '1');
    } catch {
      // Ignore quota / private-mode failures — still close for this session.
    }
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      className="gallery-preview-notice"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="gallery-preview-notice__stage" aria-hidden="true">
        <TypographyVortexCanvas
          className="gallery-preview-notice__vortex"
          hideHint
          mode="dark"
          speed={1}
          ringGrowth={1.21}
          opacity={1}
          dissolveRadius={1}
          particleAmount={0.72}
          suctionDuration={920}
        />
        <div className="gallery-preview-notice__veil" />
      </div>

      <div className="gallery-preview-notice__panel">
        <p className="gallery-preview-notice__eyebrow">{GALLERY_PREVIEW_NOTICE.eyebrow}</p>
        <h2 id={titleId} className="gallery-preview-notice__title">
          {GALLERY_PREVIEW_NOTICE.title}
        </h2>
        <p className="gallery-preview-notice__lead">{GALLERY_PREVIEW_NOTICE.lead}</p>
        <ol className="gallery-preview-notice__steps">
          {GALLERY_PREVIEW_NOTICE.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <TactileButton
          ref={buttonRef}
          type="button"
          size="lg"
          className="mt-7"
          onClick={dismiss}
        >
          {GALLERY_PREVIEW_NOTICE.buttonLabel}
        </TactileButton>
      </div>
    </div>
  );
}

export default GalleryPreviewNotice;
