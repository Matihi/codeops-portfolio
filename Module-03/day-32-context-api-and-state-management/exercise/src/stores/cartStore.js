import { create } from "zustand";

const cartStore = create((set) => ({
  cartItems: [],
  addDish: (dish) =>
    set((state) => {
      const existingDish = state.cartItems.find((item) => item.id === dish.id);
      if (!existingDish) {
        return {
          cartItems: [...state.cartItems, { ...dish, quantity: 1 }],
        };
      }
    }),

  incrementQuantity: (id) =>
    set((state) => {
      const maxOrderLimit = 15;

      const updatedQuantityDishes = state.cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity < maxOrderLimit
                  ? item.quantity + 1
                  : maxOrderLimit,
            }
          : item,
      );

      return { cartItems: updatedQuantityDishes };
    }),

  decrementQuantity: (id) =>
    set((state) => {
      const minOrderLimit = 1;

      const updatedQuantityDishes = state.cartItems
        .filter((dish) => dish.id !== id || dish.quantity > minOrderLimit)
        .map((dish) =>
          dish.id === id
            ? {
                ...dish,
                quantity: dish.quantity - 1,
              }
            : dish,
        );

      return { cartItems: updatedQuantityDishes };
    }),

  removeDish: (id) =>
    set((state) => {
      return {
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }),

  clearCart: () => set({ cartItems: [] }),
}));

export default cartStore;
