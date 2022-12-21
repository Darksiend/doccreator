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

function Floor(number) {
  const tikraFloder = `${number}/tikra/`;
  const kirotFloder = `${number}/kirot/`;
  const kirotHatahFloder = `${number}/kirot/hatah`;
  const korotTableProscanFloder = `${number}/korot/proscanTable`;
  let tikraimages = [];
  let korotTableProscanimages = [];
  let kirotimages = [];
  let kirotHatahimages = [];
  let tikraHatahimages = [];
  console.log("Floor Number", number);
  fs.readdirSync(tikraFloder).forEach((file) => {
    if (file.split(".")[1] === "png") {
      tikraimages.push(
        new ImageRun({
          data: fs.readFileSync(`${number}/tikra/${file}`),
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
          data: fs.readFileSync(`./img/floorsImg/${number}/kirot/${file}`),
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
          data: fs.readFileSync(
            `./img/floorsImg/${number}/kirot/hatah/${file}`
          ),
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
          data: fs.readFileSync(
            `./img/floorsImg/${number}/korot/proscanTable/${file}`
          ),
          transformation: {
            width: 500,
            height: 250,
          },
        })
      );
    }
  });

  //תקרת
  console.log("kirot img", kirotimages);
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
        new TextRun({
          size: 25,
          text: `בדיקות מערכת זיון התקרה נעשתה במספר מקומות. התקרה מזוהה כתקרת מקשית.`,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: tikraimages,
    }),

    new Paragraph({
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
    }),

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
          text: `קורות קומת ${number}`,
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
      children: [
        new ImageRun({
          data: fs.readFileSync(
            `./img/floorsImg/${number}/korot/table/tableKorot.png`
          ),
          transformation: {
            width: 500,
            height: 250,
          },
        }),
      ],
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
      children: [
        new ImageRun({
          data: fs.readFileSync(
            `./img/floorsImg/${number}/korot/table/tableKorot.png`
          ),
          transformation: {
            width: 500,
            height: 250,
          },
        }),
      ],
    }),
    //קירות
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new PageBreak(),
        new TextRun({
          bold: true,
          underline: { type: UnderlineType.SINGLE },
          size: 35,
          text: `קירות קומת ${number}`,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 100, after: 250 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          size: 25,
          text: `קירות חיצוניים ופנימיים הם קירות  ${data.init.kindOfBeton}`,
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
          text: ` עמודי קומה${number}`,
        }),
      ],
    }),
  ];
}

export default Floor;
