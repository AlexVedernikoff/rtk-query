import { configureStore } from "@reduxjs/toolkit";
import { medicineApi } from "./medicineApi";

export const store = configureStore({
  reducer: {
    [medicineApi.reducerPath]: medicineApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(medicineApi.middleware)
});
