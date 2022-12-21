import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import DocModel from "./models/Doc.js";
import * as DocController from "./controllers/DocxController.js";

const port = process.env.PORT || 4445;
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://darksiend:123@mycluster.eswzs4i.mongodb.net/DocxCreator?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok!");
  })
  .catch((e) => console.log("DB Error", e));

app.get("/", DocController.getAll);

app.post("/create", docxCreatingValidation, DocController.create);

app.post("/uploadImg", (req, res) => {
  console.log(req.body);
});
app.listen(port, (e) => {
  if (e) throw e;

  console.log("Server Started on port:", port);
});
