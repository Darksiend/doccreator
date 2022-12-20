import docx from "docx";
import Data from "./data/init.js";

import fs from "fs";

import headerTable from "./sections/headerSection.js";
import mainTableSection from "./sections/mainTableSection.js";
import approvedBySection from "./sections/approvedBySection.js";
import introSection from "./sections/intro/introSection.js";
import mainPhotosSection from "./sections/mainPhotos/mainPhotosSection.js";
import floorSection from "./sections/floors/floor/floorSection.js";
import headerFooterSection from "./sections/headerfooter/headerFooterSection.js";
import data from "./data/init.js";
import Floor from "./sections/floors/floor/floorSection.js";
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
const createDirs = () => {
  const floders = ["amydim", "kirot", "korot", "tikra"];
  for (let index = 0; index < data.init.numberOfFloors; index++) {
    let dir = `./img/floorsImg/${index}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      for (let i = 0; i < floders.length; i++) {
        fs.mkdirSync(dir + "/" + floders[i]);
        if (floders[i] === "tikra" || floders[i] === "kirot") {
          fs.mkdirSync(dir + "/" + floders[i] + "/hatah");
        }
      }
    }
  }
};
createDirs();

const createInitPage = () => {
  for (let i = 0; i < data.init.numberOfFloors; i++) {
    optionObj.sections.push(new Floor(i));
  }
  const doc = new Document(optionObj);

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("MyDocument.docx", buffer);
    console.log("Docx Created");
  });
};

// createInitPage();
