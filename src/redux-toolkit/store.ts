import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    main: mainSlice,
    cartSlice: cartSlice,
  }
})