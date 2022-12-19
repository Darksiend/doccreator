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
      children: [
        new ImageRun({
          data: fs.readFileSync(
            `./img/floorsImg/${number}/tikra/${number}.png`
          ),
          transformation: {
            width: 500,
            height: 700,
          },
        }),
      ],
    }),
    new PageBreak(),
  ];
}

export default Floor;
