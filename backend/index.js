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
import { createDirs, generateDocx } from "./docx/creatingDocx.js";
import multer from "multer";
import fs from "fs";
import data from "./data/init.js";
const port = process.env.PORT || 4445;
const app = express();
app.use("/docxData", express.static("/"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req", req);

    let url = `docxData/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/`;
    if (req.params.dir === "hatah") {
      url = `docxData/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/hatah/`;
    }
    if (req.params.dir === "proscanTable") {
      url = `docxData/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/proscanTable/`;
    }
    if (req.params.dir === "scans") {
      url = `docxData/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/scans/`;
    }
    cb(null, url);
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
  // docxCreatingValidation,
  // handingValidationErrors,
  DocController.create
);

app.post(
  "/upload/:docxnumber/:floor/:element/:dir",
  upload.single("image"),
  (req, res) => {
    console.log("req", req.params);
    res.json({ url: `${req.file.originalname}` });
  }
);
app.post(
  "/upload/:docxnumber/:floor/:element",
  upload.single("image"),
  (req, res) => {
    console.log("req", req.params);
    res.json({ url: `${req.file.originalname}` });
  }
);

app.post("/generate", (req, res) => {
  console.log("Req Params at /generate: ", req.body.docxObj);

  generateDocx(req.body.docxObj);
  res.json({ msg: "generated" });
  // res.json({ msg: `generated` });
});

app.get("/download", (req, res) => {
  res.set(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.set("Content-Disposition", "attachment; filename=template.docx");
  res.download("generatedDocx/generated.docx");
});
app.listen(port, (e) => {
  if (e) throw e;

  console.log("Server Started on port:", port);
});
