import { create } from 'zustand';

const recalc = (items) => ({
  items,
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

export const useCartStore = create((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart: (product) => {
    const items = get().items.map((item) => ({ ...item }));
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    set(recalc(items));
  },

  removeFromCart: (productId) => {
    set(recalc(get().items.filter((item) => item.id !== productId)));
  },

  increaseQuantity: (productId) => {
    const items = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
    );
    const item = items.find((i) => i.id === productId);
    if (!item) return;
    set(recalc(items));
  },

  decreaseQuantity: (productId) => {
    const current = get().items.find((item) => item.id === productId);
    if (!current || current.quantity <= 1) return;
    const items = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
    );
    set(recalc(items));
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));

/** Derived helpers (call with getState() or from a selector). */
export const getCartItemCount = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const isInCart = (state, productId) =>
  state.items.some((item) => item.id === productId);

export const getCartItemById = (state, productId) =>
  state.items.find((item) => item.id === productId);
