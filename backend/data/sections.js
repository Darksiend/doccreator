import Data from "./init.js";
import docx from "docx";
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
  VerticalAlign,
  Header,
  TableCell,
  WidthType,
  AUTO,
  TextDirection,
} = docx;

const mainTable = new Table({
  columnWidths: [3505, 3505],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("דו\"ח מס' 1999-EV")],
        }),
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph("3")],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text:
                "עמוד 1 מתוך 12 עמודים\n" +
                "דיווח זה מכיל 12 עמודים ואין להשתמש בו אלא במלואו.\n",
              alignment: AlignmentType.RIGHT,
            }),
          ],
          alignment: AlignmentType.RIGHT,
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({ text: "Hii", alignment: AlignmentType.RIGHT }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          alignment: AlignmentType.RIGHT,
        }),
      ],
    }),
  ],
  width: {
    size: 4535,
    type: WidthType.DXA,
  },
});
let initSection = {
  properties: {},
  headers: {
    default: new Header({
      children: [new Paragraph("Isotop LTD")],
    }),
  },
  children: [mainTable],
};

export { initSection };
