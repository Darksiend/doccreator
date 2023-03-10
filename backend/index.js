import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import DocModel from "./models/Doc.js";
import * as DocController from "./controllers/DocxController.js";
import * as UserController from "./controllers/UserController.js";
import {
  docxCreatingValidation,
  loginValidation,
  registerValidation,
} from "./validations/validations.js";

import checkAuth from "./utils/checkAuth.js";
import handingValidationErrors from "./utils/handingValidationErrors.js";
import { createDirs, generateDocx } from "./docx/creatingDocx.js";
import multer from "multer";
import fs from "fs";
import data from "./data/init.js";
const port = process.env.PORT || 4445;
const app = express();
app.use("/upload", express.static("../../../../../var/docxData"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req", req);
    let parentDir = `../../../../../var/docxData`;
    let url = `${parentDir}/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/`;
    if (req.params.dir === "hatah") {
      url = `${parentDir}/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/hatah/`;
    }
    if (req.params.dir === "table") {
      url = `${parentDir}/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/table/`;
    }
    if (req.params.dir === "scans") {
      url = `${parentDir}/${req.params.docxnumber}/${req.params.floor}/${req.params.element}/scans/`;
    }
    if (req.params.dir === "mainPhotos") {
      url = `${parentDir}/${req.params.docxnumber}/mainPhotos/`;
    }
    console.log("Uploaded to: ", url);
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

// app.post(
//   "/create",
//   // docxCreatingValidation,
//   // handingValidationErrors,
//   DocController.create
// );

app.post(
  "/register",
  registerValidation,
  handingValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidation,
  handingValidationErrors,
  UserController.login
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/docxs", DocController.getAll);

app.get("/docxs/:id", DocController.getOne);

app.post("/docxs", DocController.create);

app.patch("/docxs/:id", DocController.update);

app.delete("/docxs/:id", DocController.remove);
app.post(
  "/upload/:docxnumber/:floor/:element/:dir",
  upload.single("image"),
  (req, res) => {
    console.log("req", req.params);
    res.json({ fileName: `${req.file.originalname}` });
  }
);

app.post("/upload/:docxnumber/:dir", upload.single("image"), (req, res) => {
  console.log("req", req.params);
  res.json({ fileName: `${req.file.originalname}` });
});

app.post(
  "/upload/:docxnumber/:floor/:element",
  upload.single("image"),
  (req, res) => {
    console.log("req", req.params);
    res.json({ fileName: `${req.file.originalname}` });
  }
);

app.post("/generate", (req, res) => {
  console.log("Req Params at /generate: ", req.body.docxObj);

  generateDocx(req.body.docxObj);
  res.json({ msg: "generated" });
  // res.json({ msg: `generated` });
});

app.delete("/delete/:id", DocController.remove);

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
