import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
  numberOfDocument: { type: String, required: true },
  agreementNum: { type: String, required: true },
  placeOfCustomer: { type: String },
  projectName: { type: String, required: true },
  customerName: { type: String },
  floors: { type: Array, default: [] },
  address: { type: String },
  numberOfFloors: Number,
  user: {},
  date: { type: Date, default: Date.now },
  mainPhotos: [],
});

export default mongoose.model("Doc", DocSchema);
