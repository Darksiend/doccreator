import docx from "docx";
import Data from "./data/init.js";
import fs from "fs";
import { initSection } from "./data/sections.js";
const {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  ImageRun,
  AlignmentType,
  TextRun,
  Table,
  TableRow,
  Header,
  TableCell,
  WidthType,
} = docx;
let optionsArr = [];

let optionObj = {
  sections: [initSection],
};
const createInitPage = () => {
  const doc = new Document(optionObj);

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("MyDocument.docx", buffer);
  });
};

createInitPage();
