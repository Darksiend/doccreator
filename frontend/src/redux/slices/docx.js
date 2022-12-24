import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const docxSlice = createSlice({ name: "docxs", initialState, reducers: {} });

export const docxsReducer = docxSlice.reducer;
