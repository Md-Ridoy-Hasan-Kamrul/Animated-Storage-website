import React, { memo, useCallback, useState } from 'react';
import { ACCESS_LABEL, EMAIL_PLACEHOLDER } from '../constants';

const EmailCapture = memo(({ inkClass, durationClass }) => {
  const [email, setEmail] = useState('');

  const onSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="liquid-glass mt-8 flex w-full max-w-[320px] items-center rounded-full p-1 sm:max-w-sm"
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={EMAIL_PLACEHOLDER}
        aria-label={EMAIL_PLACEHOLDER}
        className={`min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:opacity-60 ${inkClass} ${durationClass}`}
        style={{ fontFamily: 'system-ui, sans-serif' }}
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-white px-3 py-2 text-xs text-black sm:px-4 sm:text-sm"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {ACCESS_LABEL}
      </button>
    </form>
  );
});

EmailCapture.displayName = 'EmailCapture';

export default EmailCapture;
