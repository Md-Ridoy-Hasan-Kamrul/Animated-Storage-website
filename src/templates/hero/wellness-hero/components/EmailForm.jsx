import React, { memo } from 'react';
import {
  EMAIL_ERROR_CLASS,
  EMAIL_FIELD_ID,
  EMAIL_FIELD_LABEL,
  EMAIL_INPUT_CLASS,
  EMAIL_PLACEHOLDER,
  EMAIL_SHELL_CLASS,
  EMAIL_SUBMIT_CLASS,
  JOIN_LABEL,
} from '../constants';
import { useJoinList } from '../hooks/useJoinList';

const EmailForm = memo(({ inputRef }) => {
  const { email, error, handleChange, handleSubmit } = useJoinList();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={EMAIL_SHELL_CLASS}>
        <input
          ref={inputRef}
          id={EMAIL_FIELD_ID}
          type="email"
          value={email}
          onChange={handleChange}
          placeholder={EMAIL_PLACEHOLDER}
          aria-label={EMAIL_FIELD_LABEL}
          aria-invalid={Boolean(error)}
          className={EMAIL_INPUT_CLASS}
        />
        <button type="submit" className={EMAIL_SUBMIT_CLASS}>
          {JOIN_LABEL}
        </button>
      </div>
      {error ? <p className={EMAIL_ERROR_CLASS}>{error}</p> : null}
    </form>
  );
});

EmailForm.displayName = 'EmailForm';

export default EmailForm;
