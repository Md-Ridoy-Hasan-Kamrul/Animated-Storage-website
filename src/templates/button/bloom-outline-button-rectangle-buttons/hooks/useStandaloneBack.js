import { useCallback } from 'react';
import { DETAIL_FALLBACK, HISTORY_CAN_GO_BACK_MIN } from '../constants';

export function useStandaloneBack(navigate) {
  return useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number' && idx > HISTORY_CAN_GO_BACK_MIN) {
      navigate(-1);
      return;
    }
    navigate(DETAIL_FALLBACK);
  }, [navigate]);
}
