import React, { memo, useCallback } from 'react';
import { CONTACT_EMAIL, PILL_LABELS } from '../constants';
import { copyContactEmail } from '../utils/copyContactEmail';
import CopyIcon from './CopyIcon';

const PILL_BASE =
  'mb-[0.4em] mx-[0.2em] inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-[0.3em] text-[13px] transition-colors duration-200 sm:px-5 sm:text-[15px]';

const ActionPills = memo(({ visible }) => {
  const handleCopy = useCallback(() => {
    copyContactEmail().catch(() => {});
  }, []);

  return (
    <div className={`flex flex-wrap gap-y-1 ${visible ? 'mainframe-pills is-visible' : 'mainframe-pills'}`}>
      {PILL_LABELS.map((label) => (
        <button
          key={label}
          type="button"
          className={`${PILL_BASE} border-black/10 bg-white text-black hover:bg-black hover:text-white`}
        >
          {label}
        </button>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${CONTACT_EMAIL}`}
        className={`${PILL_BASE} gap-2 border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
      >
        <span>
          Reach us:{' '}
          <span className="underline underline-offset-1">{CONTACT_EMAIL}</span>
        </span>
        <CopyIcon />
      </button>
    </div>
  );
});

ActionPills.displayName = 'ActionPills';

export default ActionPills;
