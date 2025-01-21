import { createSlice } from "@reduxjs/toolkit";

export interface initialCartSliceInterface {
  cart: {
    name: string;
    size: number;
    count: number;
    price: string;
    id: number;
  }[];
  cartCount: number;
  totalPrice: number;
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [],
    cartCount: localStorage.getItem("cartCount")
      ? JSON.parse(localStorage.getItem("cartCount") as string)
      : 0,
    totalPrice: localStorage.getItem("totalPrice")
      ? JSON.parse(localStorage.getItem("totalPrice") as string)
      : 0,
  } satisfies initialCartSliceInterface as initialCartSliceInterface,
  reducers: {
    addToCart(state, action) {
      const repeatingCard = state.cart.find(
        (el) => action.payload.id === el.id && action.payload.size === el.size
      );
      if (repeatingCard) {
        repeatingCard.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }

      state.cartCount = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, curr) => sum + Number(curr.count) * Number(curr.price),
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", String(state.cartCount));
      localStorage.setItem("totalPrice", String(state.totalPrice));
    },
    clearCart(state) {
      state.cart = [];
      state.cartCount = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("cartCount");
      localStorage.removeItem("totalPrice");
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.id !== action.payload.id);
      state.cartCount = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, curr) => sum + Number(curr.count) * Number(curr.price),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", String(state.cartCount));
      localStorage.setItem("totalPrice", String(state.totalPrice));
    },
  },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
