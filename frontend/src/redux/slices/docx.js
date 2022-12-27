import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
const initialState = {
  docxs: { items: [], status: "loading" },
};

export const fetchDocxs = createAsyncThunk("docx/fetchDocx", async (state) => {
  const { data } = await axios.get("/docxs");

  return data;
});

const docxSlice = createSlice({
  name: "docxs",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDocxs.pending]: (state) => {
      state.docxs.status = "loading";
    },
    [fetchDocxs.fulfilled]: (state, action) => {
      state.docxs.items = action.payload;
      state.docxs.status = "loaded";
    },
    [fetchDocxs.rejected]: (state) => {
      state.docxs.items = [];
      state.docxs.status = "error";
    },
  },
});

export const docxsReducer = docxSlice.reducer;
