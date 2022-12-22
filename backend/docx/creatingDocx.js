import docx from "docx";
import Data from "../data/init.js";
import cors from "cors";
import fs from "fs";
import headerTable from "./sections/headerSection.js";
import mainTableSection from "./sections/mainTableSection.js";
import approvedBySection from "./sections/approvedBySection.js";
import introSection from "./sections/intro/introSection.js";
import mainPhotosSection from "./sections/mainPhotos/mainPhotosSection.js";
import floorSection from "./sections/floors/floor/floorSection.js";
import headerFooterSection from "./sections/headerfooter/headerFooterSection.js";
import data from "../data/init.js";
import Floor from "./sections/floors/floor/floorSection.js";
import mongoose from "mongoose";
import morgan from "morgan";

const { Document, Packer } = docx;

let optionObj = {
  sections: [
    headerFooterSection,
    mainTableSection,
    approvedBySection,
    introSection,
    mainPhotosSection,
  ],
};
export const createDirs = () => {
  let parentDir = `docxData/${data.init.numberOfDocument}`;
  const floders = ["amydim", "kirot", "korot", "tikra"];
  for (let index = 0; index < 3; index++) {
    let dir = `${parentDir}/${index}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      for (let i = 0; i < floders.length; i++) {
        fs.mkdirSync(dir + "/" + floders[i], { recursive: true });
        if (floders[i] === "tikra" || floders[i] === "kirot") {
          fs.mkdirSync(dir + "/" + floders[i] + "/hatah", { recursive: true });
        }
        if (floders[i] === "korot") {
          fs.mkdirSync(dir + "/" + floders[i] + "/proscanTable", {
            recursive: true,
          });
        }
      }
    }
  }
  fs.mkdirSync("/generatedDocx");
  console.log("Dirs Created?");
};

export const generateDocx = () => {
  createDirs();
  console.log("CreatingInitPageStarted!");
  for (let i = 0; i < 2; i++) {
    optionObj.sections.push(new Floor(i));
  }
  const doc = new Document(optionObj);
  try {
    fs.rmSync("generatedDocx/generated.docx", function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });
    //file removed
  } catch (err) {
    console.error(err);
  }
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`generatedDocx/generated.docx`, buffer);
    console.log("Docx Created");
  });
};
