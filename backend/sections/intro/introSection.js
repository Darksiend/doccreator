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

const introParagraph = new Paragraph({
  alignment: AlignmentType.RIGHT,

  children: [new TextRun({ bold: true, text: "מבוא", size: 25 })],
});

let introSection = {
  properties: { type: SectionType.NEXT_PAGE },

  children: [
    introParagraph,
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          text:
            'דו"ח זה בוצע על סמך הזמנת עבודה שנתקבלה מהמזמין. מטרת ביקורת הנדסית הינה הכנת מאגר נתונים מדגמי (בנקודות שנבדקו) על מצב קיים של הקונסטרוקציות שנבחנו.\n' +
            "נתונים אלו הינם מקור הכרחי אשר ישמשו כחומר בידי",
          size: 25,
        }),
        new TextRun({
          bold: true,
          text: " המתכנן",
          size: 25,
        }),
        new TextRun({
          text: " על מנת להכין את חוות\n" + "דעתו.\n",
          size: 25,
        }),
      ],
    }),
  ],
};
export default introSection;
