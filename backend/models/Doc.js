import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
  numberOfDocument: String,
  agreementNum: String,
  floors: { type: Array, default: [] },
  user: {},
  date: { type: Date, default: Date.now },
  images: [],
});

export default mongoose.model("Doc", DocSchema);
