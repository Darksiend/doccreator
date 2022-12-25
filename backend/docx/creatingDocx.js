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
import HeaderFooterSection from "./sections/headerfooter/headerFooterSection.js";
import MainTableSection from "./sections/mainTableSection.js";
import ApprovedBySection from "./sections/approvedBySection.js";

const { Document, Packer } = docx;

let optionObj = {
  sections: [introSection, mainPhotosSection],
};
export const createDirs = (docxObj) => {
  let parentDir = `docxData/${docxObj.numberOfDocument}`;
  const floders = ["amydim", "kirot", "korot", "tikra", "mainPlan"];
  for (let index = 0; index < docxObj.numberOfFloors; index++) {
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

  console.log("Dirs Created?");
};

export const generateDocx = (docxObj) => {
  createDirs(docxObj);
  console.log("CreatingInitPageStarted!");
  optionObj.sections.unshift(new ApprovedBySection(docxObj));
  optionObj.sections.unshift(new MainTableSection(docxObj));
  optionObj.sections.unshift(new HeaderFooterSection(docxObj));
  for (let i = 0; i < docxObj.numberOfFloors; i++) {
    optionObj.sections.push(new Floor(i, docxObj));
  }

  const doc = new Document(optionObj);

  optionObj = {
    sections: [introSection, mainPhotosSection],
  };
  if (fs.existsSync("generatedDocx")) {
    fs.rmSync("generatedDocx", { recursive: true, force: true });
    console.log("generatedDocx Deleted!");
  } else {
  }

  Packer.toBuffer(doc).then((buffer) => {
    fs.mkdirSync("generatedDocx");
    fs.writeFileSync(`generatedDocx/generated.docx`, buffer);
    console.log("Docx Created");
  });
};
