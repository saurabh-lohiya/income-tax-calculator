import { configureStore } from "@reduxjs/toolkit";
import taxRateReducer from "./taxRates";

export default configureStore({
  reducer: {
    taxRate: taxRateReducer,
  }
})