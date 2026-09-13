import React from 'react';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';
import { TOAST_MS } from '../constants';

const CHECK_SIZE = 16;

function BagToast({ message }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-black px-4 py-3 text-sm text-white">
      <Check size={CHECK_SIZE} className="text-emerald-400" strokeWidth={2} />
      <span>{message}</span>
    </div>
  );
}

export function showBagToast(message) {
  toast.custom((t) => (t.visible ? <BagToast message={message} /> : null), {
    duration: TOAST_MS,
    position: 'top-right',
  });
}
