import { configureStore } from "@reduxjs/toolkit";
import { docxsReducer } from "./slices/docx";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: { docxs: docxsReducer, auth: authReducer },
});

export default store;
