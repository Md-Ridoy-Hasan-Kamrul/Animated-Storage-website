import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import {
  EMAIL_EMPTY_MESSAGE,
  EMAIL_INVALID_MESSAGE,
  JOIN_TOAST_PREFIX,
} from '../constants';
import { isValidEmail, joinToastMessage, normalizeEmail } from '../utils/email';

export function useJoinList() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback((event) => {
    setEmail(event.target.value);
    setError('');
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const next = normalizeEmail(email);
      if (!next) {
        setError(EMAIL_EMPTY_MESSAGE);
        return;
      }
      if (!isValidEmail(next)) {
        setError(EMAIL_INVALID_MESSAGE);
        return;
      }
      toast.success(joinToastMessage(JOIN_TOAST_PREFIX, next));
      setEmail('');
      setError('');
    },
    [email],
  );

  return { email, error, handleChange, handleSubmit };
}
