import React, { memo } from 'react';
import { RETRY_LABEL } from '../constants';

const RetryNotice = memo(({ error, onRetry }) => {
  if (!error) return null;
  return (
    <div className="notice">
      <button type="button" className="retry" onClick={onRetry}>
        {RETRY_LABEL}
      </button>
    </div>
  );
});

RetryNotice.displayName = 'RetryNotice';

export default RetryNotice;
