import Data from "../../data/init.js";
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
import data from "../../data/init.js";
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
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 20,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,

              children: [
                new TextRun({
                  text: `תפוצה מאושרת`,
                  size: 15,
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
                  text:
                    'הפרטים על המדגם הינם כפי שנמסרו ע"י המזמין. התוצאות מתייחסות לפריט שנבדק בלבד.\n' +
                    "יש להת למסמך זה במלואו ובשלמותו ואין להעתיק או לפרסם ממנו קטעים או קים כלשהם.",
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
          columnSpan: [2],
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `!דיווח זה מכיל 12 עמודים ואין להשתמש בו אלא במלואו`,
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

function ApprovedBySection(docxObj) {
  this.properties = { type: SectionType.CONTINUOUS };
  this.children = [
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
    new Table({
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
                      text: `${docxObj.date}`,
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
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 20,
                type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,

                  children: [
                    new TextRun({
                      text: `תפוצה מאושרת`,
                      size: 15,
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
                      text:
                        'הפרטים על המדגם הינם כפי שנמסרו ע"י המזמין. התוצאות מתייחסות לפריט שנבדק בלבד.\n' +
                        "יש להת למסמך זה במלואו ובשלמותו ואין להעתיק או לפרסם ממנו קטעים או קים כלשהם.",
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
              columnSpan: [2],
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `!דיווח זה מכיל 12 עמודים ואין להשתמש בו אלא במלואו`,
                      size: 25,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}

export default ApprovedBySection;
