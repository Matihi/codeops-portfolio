import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addDish: (dish) =>
        set((state) => {
          const existingDish = state.cartItems.find(
            (item) => item.id === dish.id,
          );

          if (!existingDish) {
            return {
              cartItems: [...state.cartItems, { ...dish, quantity: 1 }],
            };
          }

          if (Object.hasOwn(dish, "spiceLevelCart")) {
            const updatedCartItems = state.cartItems.map((item) =>
              item.id === dish.id && dish.category !== "Beverages & Tej"
                ? {
                    ...item,
                    spiceLevelCart: dish.spiceLevelCart,
                  }
                : item,
            );

            return {
              cartItems: updatedCartItems,
            };
          }

          return state;
        }),

      incrementQuantity: (id) =>
        set((state) => {
          const maxOrderLimit = 15;

          const updatedCartItems = state.cartItems.map((item) =>
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

          return {
            cartItems: updatedCartItems,
          };
        }),

      decrementQuantity: (id) =>
        set((state) => {
          const minOrderLimit = 1;

          const updatedCartItems = state.cartItems
            .filter((item) => item.id !== id || item.quantity > minOrderLimit)
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            );

          return {
            cartItems: updatedCartItems,
          };
        }),

      removeDish: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () =>
        set({
          cartItems: [],
        }),
    }),
    {
      name: "addis-eats-cart",
    },
  ),
);

export default useCartStore;
