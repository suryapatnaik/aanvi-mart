import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cartSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer to the store
    cart: cartReducer, // Add cart reducer to the store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
