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
      children: [
        new ImageRun({
          data: fs.readFileSync("./img/mainImages"),
          transformation: {
            width: 300,
            height: 300,
          },
        }),
      ],
    }),
  ],
};

export default mainPhotosSection;
