import React from 'react';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { CART_EMPTY, CHECKOUT_LABEL, ICON_STROKE, REMOVE_LABEL } from '../constants';

const ShoppingBagPanel = ({ lines, onRemove, onCheckout }) => {
  if (!lines.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center text-gray-500">
        <ShoppingBag className="synth-icon" strokeWidth={ICON_STROKE} />
        <p className="synth-body font-jakarta">{CART_EMPTY}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ul className="flex-1 space-y-5">
        {lines.map((line) => (
          <li key={line.id} className="flex items-start justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <p className="font-orbitron text-sm uppercase tracking-[0.08em]">{line.title}</p>
              <p className="synth-body mt-1 font-jakarta">
                {line.price}
                {line.qty > 1 ? ` × ${line.qty}` : ''}
              </p>
            </div>
            <button
              type="button"
              className="synth-micro uppercase text-gray-500 hover:text-black"
              onClick={() => onRemove(line.id)}
            >
              {REMOVE_LABEL}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-8 flex w-full items-center justify-center gap-2 bg-black py-3 font-jakarta text-white uppercase tracking-[0.18em]"
        onClick={onCheckout}
      >
        {CHECKOUT_LABEL}
        <ChevronRight className="synth-icon" strokeWidth={ICON_STROKE} />
      </button>
    </div>
  );
};

export default ShoppingBagPanel;
