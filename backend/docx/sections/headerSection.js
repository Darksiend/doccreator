import Data from "../../data/init.js";
const {
  Paragraph,
  SectionType,
  Table,
  WidthType,
  TableRow,
  AlignmentType,
  TableCell,
  Header,
  VerticalAlign,
  PageNumber,
  TextRun,
} = docx;
import docx from "docx";
function HeaderSection(docxObj) {
  this.children = [];
}
const headerTable = new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 50,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              text: ` דוח מס' ${Data.init.numberOfDocument}`,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "המעבדה לבדיקות אל-הרס",
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              text:
                `עמוד ${PageNumber.TOTAL_PAGES} מתוך 12 עמודיn ` +
                "דיווח זה מכיל 12 עמודים ואין להשתמש בו אלא במלואו.\n",
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "ביקורת הנדסית של המבנים",
              alignment: AlignmentType.LEFT,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
    }),
  ],
});

export default headerTable;
