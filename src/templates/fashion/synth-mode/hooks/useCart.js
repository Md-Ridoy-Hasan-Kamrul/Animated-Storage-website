import { useCallback, useState } from 'react';
import { CHECKOUT_TOAST } from '../constants';
import { showBagToast } from '../utils/bagToast';
import { addGarment, addedToast, cartCount, removeGarment } from '../utils/revealMath';

export function useCart() {
  const [lines, setLines] = useState([]);

  const addItem = useCallback((garment) => {
    setLines((current) => addGarment(current, garment));
    showBagToast(addedToast(garment.title));
  }, []);

  const removeItem = useCallback((id) => {
    setLines((current) => removeGarment(current, id));
  }, []);

  const checkout = useCallback((onDone) => {
    showBagToast(CHECKOUT_TOAST);
    setLines([]);
    onDone?.();
  }, []);

  return {
    lines,
    count: cartCount(lines),
    addItem,
    removeItem,
    checkout,
  };
}
