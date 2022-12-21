import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
  numberOfDocument: { type: String, required: true },
  agreementNum: { type: String, required: true },
  floors: { type: Array, default: [] },
  numberOfFloors: Number,
  user: {},
  date: { type: Date, default: Date.now },
  images: [],
});

export default mongoose.model("Doc", DocSchema);
