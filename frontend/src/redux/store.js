import { configureStore } from "@reduxjs/toolkit";
import { docxsReducer } from "./slices/docx";

const store = configureStore({ reducer: { docxs: docxsReducer } });

export default store;
