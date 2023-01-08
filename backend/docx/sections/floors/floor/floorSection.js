const {
  Paragraph,
  SectionType,
  AlignmentType,
  UnderlineType,
  TextRun,
  ImageRun,
  PageBreak,
} = docx;
import docx, { Table } from "docx";
import fs from "fs";
import data from "../../../../data/init.js";

function Floor(number, docxObj) {
  let parentFloder = `../../../../../var/docxData/${docxObj.numberOfDocument}/${number}`;
  const tikraFloder = `${parentFloder}/tikra/`;
  const tikraHatahFloder = `${parentFloder}/tikra/hatah`;
  const tikraTableFloder = `${parentFloder}/tikra/table`;
  const tikraScansFloder = `${parentFloder}/tikra/scans`;
  const kirotFloder = `${parentFloder}/kirot/`;
  const kirotHatahFloder = `${parentFloder}/kirot/hatah`;
  const korotTableProscanFloder = `${parentFloder}/korot/table`;
  const korotScansFloder = `${parentFloder}/korot/scans`;
  const mainPlanFloder = `${parentFloder}/mainPlan`;
  const amydimFloder = `${parentFloder}/amydim`;

  let korotTableProscanimages = [];
  let korotScansimages = [];
  let kirotimages = [];
  let kirotHatahimages = [];
  let tikraHatahimages = [];
  let mainPlanimages = [];
  let tikraTableimages = [];
  let tikraScansimages = [];
  let amydimimages = [];

  fs.readdirSync(amydimFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      amydimimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/amydim/${file}`),
          transformation: {
            width: 550,
            height: 350,
          },
        })
      );
    }
  });

  fs.readdirSync(korotScansFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      korotScansimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/korot/scans/${file}`),
          transformation: {
            width: 550,
            height: 150,
          },
        })
      );
    }
  });
  fs.readdirSync(korotTableProscanFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      korotTableProscanimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/korot/table/${file}`),
          transformation: {
            width: 550,
            height: 300,
          },
        })
      );
    }
  });
  fs.readdirSync(mainPlanFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      mainPlanimages.push(
        new ImageRun({
          data: fs.readFileSync(`${mainPlanFloder}/${file}`),
          transformation: {
            width: 550,
            height: 720,
          },
        })
      );
    }
  });

  fs.readdirSync(tikraHatahFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      tikraHatahimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/tikra/hatah/${file}`),
          transformation: {
            width: 500,
            height: 150,
          },
        })
      );
    }
  });

  fs.readdirSync(tikraTableFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      tikraTableimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/tikra/table/${file}`),
          transformation: {
            width: 550,
            height: 80,
          },
        })
      );
    }
  });

  fs.readdirSync(tikraScansFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      tikraScansimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/tikra/scans/${file}`),
          transformation: {
            width: 500,
            height: 600,
          },
        })
      );
    }
  });

  fs.readdirSync(kirotFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      console.log(true);
      kirotimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/kirot/${file}`),
          transformation: {
            width: 500,
            height: 250,
          },
        })
      );
    }
  });

  fs.readdirSync(kirotHatahFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      console.log(true);
      kirotHatahimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/kirot/hatah/${file}`),
          transformation: {
            width: 500,
            height: 250,
          },
        })
      );
    }
  });

  let floorObj = docxObj.floors[number];

  let amydTable;
  const createAmydTable = (amydArr) => {
    amydTable = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [new TableRow({}), new TableRow({})],
    });
  };
  //תקרת

  createAmydTable(floorObj.amydim.amydArr);

  this.properties = { type: SectionType.NEXT_PAGE };

  this.children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `מיפוי קונסטרוקציה קומת ${floorObj.name}`,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `מיפוי קונסטרוקציה קומת קרקע בוצע באמצעות מצלמה תרמית ופרוסקן.`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: mainPlanimages,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `תקרת קומת ${floorObj.name}`,
        }),
      ],
    }),

    floorObj.tikra.kindOfTikra === "מקשית"
      ? new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              size: 25,
              text: `בדיקות מערכת זיון התקרה נעשתה במספר מקומות. התקרה מזוהה כתקרת מקשית.`,
            }),
            new TextRun({
              size: 25,
              text: "עובי כיסוי הבטון כ- ",
            }),
            new TextRun({
              size: 25,
              text: `${floorObj.tikra.oviKisyiBeton}`,
            }),
            new TextRun({ size: 25, text: " ס״מ" }),
            new TextRun({ size: 25, text: ". עובי התקרה נטו " }),
            new TextRun({ size: 25, text: `${floorObj.tikra.oviTikra}` }),
            new TextRun({ size: 25, text: " ס״מ " }),
          ],
        })
      : new Paragraph({
          //צלעות
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              size: 25,
              text: `בדיקות מערכת זיון התקרה נעשתה במספר מקומות. התקרה מזוהה כתקרת צלעות.`,
            }),
          ],
        }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: tikraTableimages,
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `תוצאות סריקת פרוסקן במקשית מסי`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: tikraScansimages,
    }),

    floorObj.tikra.isHatah
      ? new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 250 },

          children: [
            new TextRun({
              underline: { type: UnderlineType.SINGLE },
              size: 35,
              bold: true,
              text: "חתך",
            }),
          ],
        })
      : new Paragraph({ text: "" }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: tikraHatahimages,
    }),

    //קורות
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `קורות קומת ${floorObj.name}`,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 500, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `פירות בדיקות קורות`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: korotTableProscanimages,
    }),

    new Paragraph({
      spacing: { before: 500, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `תוצאות סריקת פרוסקן קורות`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: korotScansimages,
    }),
    // new Paragraph({
    //   alignment: AlignmentType.CENTER,
    //   children: [
    //     new ImageRun({
    //       data: fs.readFileSync(
    //         `./img/floorsImg/${number}/korot/table/tableKorot.png`
    //       ),
    //       transformation: {
    //         width: 500,
    //         height: 250,
    //       },
    //     }),
    //   ],
    // }),
    //קירות
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `קירות קומת ${floorObj.name}`,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 100, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `קירות חיצוניים ופנימיים הם קירות  ${floorObj.kirot.kindOfBeton}`,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: kirotimages,
    }),
    //amydim
    new Paragraph({
      spacing: { before: 100, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: ` עמודי קומה${floorObj.name}`,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 100, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `מידות עמודים כוללים עובי שכבת טיח כ-1 ס"מ`,
        }),
        new TextRun({
          size: 25,
          text: `. תוצאות הסריקות ומידות העמודים שניתנו לבדיקה מוצגת בטאבלה. קוטר ברזל`,
        }),
        new TextRun({
          size: 25,
          text: `${floorObj.amydim.koterBarzel}`,
        }),
        new TextRun({ size: 25, text: ' מ"מ בעמוד מסי' }),
        new TextRun({
          size: 25,
          text: `${floorObj.amydim.amydNumber}`,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: amydimimages,
        }),
      ],
    }),
    amydTable,
  ];
}

export default Floor;
