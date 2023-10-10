import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import transactionReducer from "./reducer/transaction";
export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction:transactionReducer
  },
});
