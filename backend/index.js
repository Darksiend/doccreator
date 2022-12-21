import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import DocModel from "./models/Doc.js";
import * as DocController from "./controllers/DocxController.js";
import { docxCreatingValidation } from "./validations/validations.js";
import handingValidationErrors from "./utils/handingValidationErrors.js";
import { createDirs, createInitPage } from "./docx/creatingDocx.js";
import multer from "multer";
import fs from "fs";
const port = process.env.PORT || 4445;
const app = express();
app.use("/upload", express.static("/"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "0/tikra/");
  },
  filename: (req, file, cb) => {
    console.log("file:", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

app.post(
  "/create",
  docxCreatingValidation,
  handingValidationErrors,
  DocController.create
);

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.body);
  res.json({ url: `${req.file.originalname}` });
});

app.get("/download", (req, res) => {
  // createInitPage();
  console.log("Stated creating in index.js");
  res.set(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.set("Content-Disposition", "attachment; filename=template.docx");
  res.download("docx12345.docx");
});
app.listen(port, (e) => {
  if (e) throw e;

  console.log("Server Started on port:", port);
});
