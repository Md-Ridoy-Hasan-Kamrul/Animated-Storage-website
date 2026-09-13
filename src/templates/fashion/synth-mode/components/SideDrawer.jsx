import React from 'react';
import { X } from 'lucide-react';
import {
  DRAWER_CART_TITLE,
  DRAWER_COLLECTIONS_TITLE,
  DRAWER_FOOTER,
  DRAWER_JOURNAL_TITLE,
  DRAWER_SHOP_TITLE,
  ICON_STROKE,
} from '../constants';
import ShopCatalog from './ShopCatalog';
import CollectionsArchive from './CollectionsArchive';
import JournalEditorial from './JournalEditorial';
import ShoppingBagPanel from './ShoppingBagPanel';

const TITLES = {
  shop: DRAWER_SHOP_TITLE,
  collections: DRAWER_COLLECTIONS_TITLE,
  journal: DRAWER_JOURNAL_TITLE,
  cart: DRAWER_CART_TITLE,
};

const SideDrawer = ({ drawer, onClose, cart, onAdd, onRemove, onCheckout }) => {
  if (!drawer) return null;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] synth-backdrop"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <aside className="synth-drawer absolute inset-y-0 right-0 z-10 flex h-full w-full flex-col border-l border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron synth-drawer-title uppercase">{TITLES[drawer]}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-black hover:opacity-50">
            <X className="synth-icon" strokeWidth={ICON_STROKE} />
          </button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">
          {drawer === 'shop' ? <ShopCatalog onAdd={onAdd} /> : null}
          {drawer === 'collections' ? <CollectionsArchive /> : null}
          {drawer === 'journal' ? <JournalEditorial /> : null}
          {drawer === 'cart' ? (
            <ShoppingBagPanel lines={cart} onRemove={onRemove} onCheckout={onCheckout} />
          ) : null}
        </div>

        {drawer !== 'cart' ? (
          <p className="synth-micro mt-6 text-center uppercase text-gray-500">{DRAWER_FOOTER}</p>
        ) : null}
      </aside>
    </div>
  );
};

export default SideDrawer;
