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
import data from "../../../../data/init.js";

function Floor(number, docxObj) {
  const parentFloder = `docxData/${data.init.numberOfDocument}/${number}`;
  const tikraFloder = `${parentFloder}/tikra/`;
  const tikraHatahFloder = `${parentFloder}/tikra/hatah`;
  const kirotFloder = `${parentFloder}/kirot/`;
  const kirotHatahFloder = `${parentFloder}/kirot/hatah`;
  const korotTableProscanFloder = `${parentFloder}/korot/proscanTable`;
  let tikraimages = [];
  let korotTableProscanimages = [];
  let kirotimages = [];
  let kirotHatahimages = [];
  let tikraHatahimages = [];

  fs.readdirSync(tikraFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      tikraimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/tikra/${file}`),
          transformation: {
            width: 500,
            height: 150,
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
  fs.readdirSync(korotTableProscanFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      console.log(true);
      korotTableProscanimages.push(
        new ImageRun({
          data: fs.readFileSync(`${parentFloder}/korot/proscanTable/${file}`),
          transformation: {
            width: 500,
            height: 250,
          },
        })
      );
    }
  });

  let floorObj = docxObj.floors[number];
  //תקרת

  this.properties = { type: SectionType.NEXT_PAGE };
  this.children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
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
          //צלעות
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
      children: tikraimages,
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
  ];
}

export default Floor;
