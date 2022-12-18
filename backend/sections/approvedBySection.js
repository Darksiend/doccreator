import Data from "../data/init.js";
const {
  Paragraph,
  SectionType,
  Table,
  WidthType,
  TableRow,
  AlignmentType,
  TableCell,
  HeadingLevel,
  Header,
  TextRun,
  VerticalAlign,
  PageNumber,
  ImageRun,
} = docx;
import docx from "docx";
import fs from "fs";
import data from "../data/init.js";
const hatima = new ImageRun({
  data: fs.readFileSync("./img/hatima.png"),
  transformation: {
    width: 80,
    height: 80,
  },
});
const approvedByTable = new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },

  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 20,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph({ children: [hatima] })],
        }),
        new TableCell({
          width: {
            size: 80,
            type: WidthType.PERCENTAGE,
          },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              // text: ` מהנדס ראשי לבדיקות מיוחדות: ד"ר לאוניד שרשבסקי `,
              alignment: AlignmentType.CENTER,

              children: [
                new TextRun({
                  text: 'מהנדס ראשי לבדיקות מיוחדות: ד"ר לאוניד שרשבסקי',
                  size: 25,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 20,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,

              children: [
                new TextRun({
                  text: `${data.init.date}`,
                  size: 25,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: {
            size: 80,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,

              children: [
                new TextRun({
                  text: "מבצע הבדיקה:מהנדסים יורי לויצקי, דמיטרי צסנוקוב",
                  size: 25,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

const approvedBySection = {
  properties: { type: SectionType.CONTINUOUS },
  children: [
    new Paragraph({
      text: "",
      spacing: {
        before: 500,
      },
    }),
    new Paragraph({
      text: "",
      spacing: {
        before: 500,
      },
    }),
    approvedByTable,
  ],
};

export default approvedBySection;
