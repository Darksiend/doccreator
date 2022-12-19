const {
  Paragraph,
  SectionType,
  Table,
  WidthType,
  TableRow,
  AlignmentType,
  TableCell,
  UnderlineType,
  Header,
  VerticalAlign,
  PageNumber,
  TextRun,
} = docx;
import docx from "docx";

const introParagraph = new Paragraph({
  alignment: AlignmentType.RIGHT,
  children: [
    new TextRun({
      underline: {
        type: UnderlineType.SINGLE,
      },
      bold: true,
      text: "מבוא",
      size: 35,
    }),
  ],
});

let introSection = {
  properties: { type: SectionType.NEXT_PAGE },

  children: [
    introParagraph,
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        before: 500,
        after: 500,
      },
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
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({
          underline: {
            type: UnderlineType.SINGLE,
          },
          bold: true,
          text: "צילום תרמוגרפיה",
          size: 35,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        before: 500,
        after: 100,
      },
      children: [
        new TextRun({
          text:
            "המצלמה התרמוגרפיה הדיגיטאלית רגישה להבדלי טמפרטורה בפני העצמים השונים אותם היא מצלמת. נתאר לעצמנו אלמנט נבחן המשמש קיר, תקרת ביניים במבנה או גג הנמצאת בטמפרטורה קבועה שהיא טמפרטורת הסביבה. מוליכותו התרמית של חומרי בניה שונה. כך ייווצרו פסים בעלי טמפרטורות שונות מגדירים אזורים של חומרים שונים\n" +
            ".(בטון – בלוקים). פסים אלו ניתנים לזיהוי תוך ביצוע הצילום התרמוגרפיה",
          size: 25,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        after: 400,
      },
      children: [
        new TextRun({
          size: 25,
          text: "Camera Ti 400. FLUKE Systems Corp מכשיר צילום תרמוגרפיה  ",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 500 },
      children: [
        new TextRun({
          underline: {
            type: UnderlineType.SINGLE,
          },
          bold: true,
          size: 35,
          text: "סריקת פרופומטר (פרוסקן).",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        after: 400,
      },
      children: [
        new TextRun({
          size: 25,

          text:
            "הפרופומטר עושה שימוש בעקרון זרמי מערבולת. המכשיר מכיל סליל בעל אינדוקציה אלקטרומגנטית. כאשר הסליל מונח בקרבת חוט מוליך חשמלי או מוט פרומגנטי (מוט זיון), אינדוקציה של הסליל משתנה (בדומה לסליל שמכניסים לתוכו פריט). המכשיר מזהה שינוי זה ונותן חיווי. המכשיר מסוגל להבחין בין שינוי הנובע ממוט זיון קרוב לפני\n" +
            "השטח או מוט זיון מרוחק מפני השטח ומקוטר קטן או גדול של מוט הזיון .",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        after: 400,
      },
      children: [
        new TextRun({
          size: 25,
          text: "Ferroscan PS200. HILTI Corp מכשיר סריקת פרופומטר",
        }),
      ],
    }),
  ],
};
export default introSection;
