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
  SectionType,
  TableRow,
  VerticalAlign,
  Header,
  TableCell,
  WidthType,
  AUTO,
  TextDirection,
  PageNumber,
} = docx;

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

let headerSection = {
  properties: { type: SectionType.NEXT_PAGE },
  headers: {
    default: new Header({
      children: [new Paragraph("Isotop LTD")],
    }),
  },
  children: [headerTable],
};

const spacingSection = {
  properties: { type: SectionType.CONTINUOUS },

  children: [new Paragraph("")],
};

const mainTable = new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },

  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              text: `${Data.init.agreementNum}`,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({ text: "הסכם", alignment: AlignmentType.CENTER }),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              text: `${Data.init.customerName}`,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          width: {
            size: 30,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              text: "שם המזמין",
              alignment: AlignmentType.CENTER,
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
              text: ``,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "מען המזמין",
              alignment: AlignmentType.CENTER,
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
              text: `${Data.init.projectName}`,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "שם הפרויקט",
              alignment: AlignmentType.CENTER,
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
              text: `${Data.init.address}`,
              alignment: AlignmentType.LEFT,
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              text: "כתובת האתר",
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      ],
    }),
  ],
});
let mainTableSection = {
  properties: { type: SectionType.CONTINUOUS },
  children: [mainTable],
};

export { mainTableSection, headerTable, spacingSection, headerSection };
