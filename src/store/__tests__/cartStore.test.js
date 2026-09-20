import {
  useCartStore,
  getCartItemCount,
  getCartTotal,
  isInCart,
  getCartItemById,
} from '../cartStore';

const productA = { id: 'p1', name: 'Widget', price: 10 };
const productB = { id: 'p2', name: 'Gadget', price: 25 };

beforeEach(() => {
  useCartStore.setState({ items: [], totalItems: 0, totalPrice: 0 });
});

describe('cartStore', () => {
  describe('addToCart', () => {
    it('adds a new item with quantity 1', () => {
      useCartStore.getState().addToCart(productA);
      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toMatchObject({ id: 'p1', quantity: 1 });
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(10);
    });

    it('increments quantity when item already exists', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().addToCart(productA);
      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(20);
    });

    it('adds multiple distinct items', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().addToCart(productB);
      const state = useCartStore.getState();
      expect(state.items).toHaveLength(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(35);
    });
  });

  describe('removeFromCart', () => {
    it('removes the item and recalculates totals', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().removeFromCart('p1');
      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('increaseQuantity', () => {
    it('adds 1 to the item quantity and updates totals', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().increaseQuantity('p1');
      const state = useCartStore.getState();
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(20);
    });
  });

  describe('decreaseQuantity', () => {
    it('subtracts 1 when quantity is above 1', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().decreaseQuantity('p1');
      expect(useCartStore.getState().items[0].quantity).toBe(1);
    });

    it('does not go below 1', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().decreaseQuantity('p1');
      expect(useCartStore.getState().items[0].quantity).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('empties all items and resets totals', () => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().addToCart(productB);
      useCartStore.getState().clearCart();
      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('helpers', () => {
    beforeEach(() => {
      useCartStore.getState().addToCart(productA);
      useCartStore.getState().addToCart(productB);
    });

    it('getCartItemCount returns sum of quantities', () => {
      expect(getCartItemCount(useCartStore.getState())).toBe(2);
    });

    it('getCartTotal returns sum of prices', () => {
      expect(getCartTotal(useCartStore.getState())).toBe(35);
    });

    it('isInCart returns true for an item in cart', () => {
      expect(isInCart(useCartStore.getState(), 'p1')).toBe(true);
    });

    it('isInCart returns false for an item not in cart', () => {
      expect(isInCart(useCartStore.getState(), 'p99')).toBe(false);
    });

    it('getCartItemById returns the correct item', () => {
      expect(getCartItemById(useCartStore.getState(), 'p2')).toMatchObject({
        id: 'p2',
        name: 'Gadget',
      });
    });
  });
});
