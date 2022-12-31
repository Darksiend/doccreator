import fs from "fs";

const {
  Paragraph,
  SectionType,
  AlignmentType,
  ImageRun,
  UnderlineType,
  TextRun,
} = docx;
import docx from "docx";
import data from "../../../data/init.js";
let mainPhotos = [];
if (!fs.existsSync(`docxData/${data.init.numberOfDocument}/mainPhotos`))
  fs.mkdirSync(`docxData/${data.init.numberOfDocument}/mainPhotos`, {
    recursive: true,
  });
fs.readdirSync(`docxData/${data.init.numberOfDocument}/mainPhotos`).forEach(
  (file) => {
    if (file.split(".")[1] === "png") {
      mainPhotos.push(
        new ImageRun({
          data: fs.readFileSync(
            `docxData/${data.init.numberOfDocument}/mainPhotos/${file}`
          ),
          transformation: {
            width: 500,
            height: 150,
          },
        })
      );
    }
  }
);
console.log(mainPhotos);
let mainPhotosSection = {
  properties: { type: SectionType.NEXT_PAGE },
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [
        new TextRun({
          size: 35,
          underline: { type: UnderlineType.SINGLE },
          text: "תמונות",
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 300 },
      children: mainPhotos,
    }),
  ],
};

function MainPhotosSection(docxObj) {
  let mainPhotos = [];
  let parentFloder = `../../../../../var/docxData/${docxObj.numberOfDocument}`;
  fs.readdirSync(`${parentFloder}/mainPhotos`).forEach((file) => {
    if (file.split(".")[1] === "png") {
      mainPhotos.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/${file}`),
          transformation: {
            width: 500,
            height: 150,
          },
        })
      );
    }
  });
  this.properties = { type: SectionType.NEXT_PAGE };
  this.children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [
        new TextRun({
          size: 35,
          underline: { type: UnderlineType.SINGLE },
          text: "תמונות",
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 300 },
      children: mainPhotos,
    }),
  ];
}

export default MainPhotosSection;
