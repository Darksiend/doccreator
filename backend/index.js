import express from "express";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import mongoose from "mongoose";
import DocModel from "./models/Doc.js";

const port = process.env.PORT || 4445;
const app = express();
app.use(morgan("dev"));

mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://darksiend:123@mycluster.eswzs4i.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok!");
  })
  .catch((e) => console.log("DB Error", e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, (e) => {
  if (e) throw e;

  console.log("port:", port);
});
