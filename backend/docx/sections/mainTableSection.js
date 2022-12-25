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
} = docx;
import docx from "docx";
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
    mainTable,
  ],
};

function MainTableSection(docxObj) {
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
              children: [
                new Paragraph({
                  text: `${docxObj.agreementNum}`,
                  alignment: AlignmentType.LEFT,
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: "הסכם",
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
                  text: `${docxObj.customerName}`,
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
                  text: `${docxObj.placeOfCustomer}`,
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
                  text: `${docxObj.projectName}`,
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
                  text: `${docxObj.address}`,
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
    }),
  ];
}

export default MainTableSection;
