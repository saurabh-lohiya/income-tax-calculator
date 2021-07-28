import { configureStore } from "@reduxjs/toolkit";
import incomeTaxReducer from "./incomeTax";

export default configureStore({
  reducer: {
    incomeTaxRate: incomeTaxReducer
  }
})