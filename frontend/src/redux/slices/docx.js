import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
const initialState = {
  docxs: { items: [], status: "loading" },
};

export const fetchDocxs = createAsyncThunk("docx/fetchDocx", async (state) => {
  const { data } = await axios.get("/docxs");

  return data;
});

export const deleteDocx = createAsyncThunk("posts/delete", async (id) => {
  const { data } = await axios.delete(`/delete/${id}`);
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
    [deleteDocx.pending]: (state, action) => {
      state.docxs.items = state.docxs.items.filter(
        (docx) => docx._id !== action.meta.arg
      );
      state.tags.status = "loading";
    },
  },
});

export const docxsReducer = docxSlice.reducer;
