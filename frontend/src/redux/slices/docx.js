import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {};

export const fetchPosts = createAsyncThunk("docx/fetchDocx", async (state) => {
  const { data } = await axios.get("/docxs");

  return data;
});

const docxSlice = createSlice({ name: "docxs", initialState, reducers: {} });

export const docxsReducer = docxSlice.reducer;
