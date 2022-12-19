import tikraSection from "../../tikra/tikra.js";

const {
  Paragraph,
  SectionType,
  AlignmentType,
  UnderlineType,
  TextRun,
  ImageRun,
  PageBreak,
} = docx;
import docx from "docx";
import fs from "fs";

function Floor(number) {
  const tikraFloder = `./img/floorsImg/${number}/tikra/`;
  const kirotFloder = `./img/floorsImg/${number}/kirot/`;
  let tikraimages = [];
  let kirotimages = [];
  console.log("Floor Number", number);
  fs.readdirSync(tikraFloder).forEach((file) => {
    console.log(file);
    if (file.split(".")[1] === "png") {
      tikraimages.push(
        new ImageRun({
          data: fs.readFileSync(`./img/floorsImg/${number}/tikra/${file}`),
          transformation: {
            width: 500,
            height: 150,
          },
        })
      );
    }
  });
  fs.readdirSync(kirotFloder).forEach((file) => {
    console.log(file);
    if (file.split(".")[1] === "png") {
      kirotimages.push(
        new ImageRun({
          data: fs.readFileSync(`./img/floorsImg/${number}/kirot/${file}`),
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
      children: [
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `תקרת קומת ${number}`,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: tikraimages,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `קירות קומת ${number}`,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: kirotimages,
        }),
      ],
    }),
  ];
}

export default Floor;
