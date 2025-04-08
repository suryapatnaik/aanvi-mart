import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer to the store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
