import React from 'react';
import { ADD_LABEL, DRAWER_SHOP_SUB, GARMENTS } from '../constants';

const ShopCatalog = ({ onAdd }) => (
  <div>
    <p className="synth-body mb-6 font-jakarta font-semibold uppercase tracking-[0.18em] text-gray-500">
      {DRAWER_SHOP_SUB}
    </p>
    <ul className="space-y-6">
      {GARMENTS.map((item) => (
        <li key={item.id} className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <p className="synth-micro uppercase text-gray-500">{item.tag}</p>
            <p className="font-orbitron mt-1 text-sm uppercase tracking-[0.08em]">{item.title}</p>
            <p className="synth-body mt-1 font-jakarta">{item.price}</p>
          </div>
          <button
            type="button"
            className="synth-micro border border-gray-400 px-3 py-1.5 uppercase tracking-[0.18em] hover:bg-black hover:text-white hover:border-black"
            onClick={() => onAdd(item)}
          >
            {ADD_LABEL}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ShopCatalog;
