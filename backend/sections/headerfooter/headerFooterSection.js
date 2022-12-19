import headerTable from "../headerSection.js";
const { Paragraph, Header, TextRun, Footer } = docx;
import docx from "docx";
const headerFooterSection = {
  headers: {
    default: new Header({
      // The standard default header on every page or header on odd pages when the 'Different Odd & Even Pages' option is activated
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "ISOTOP LTD",
              size: 75,
            }),
          ],
        }),
        ,
        headerTable,
      ],
    }),
  },
  footers: {
    default: new Footer({
      // The standard default footer on every page or footer on odd pages when the 'Different Odd & Even Pages' option is activated
      children: [
        new Paragraph(
          'הנהלה ומעבדה מרכזית: א"ת כנות, הירוק 20, טל: 08-8697000, Email: isotop@isotop.co.ilwww.isotop.co.il באר-שבע, דרך נפחא 6, טל:08-6280193, ירושלים, גבעת שאול, 6/27 מרכז ספיר, טל:02-6510231, רחובות, משה יתום 23, טל:08-9365065, נצרת עילית, היצירה 4, טל: 04-6569666 נתניה, גלגלי הפלדה 18, טל: 09-8620838 קרית-ביאליק, החרושת 36 טל:04-8766501, ראשל"צ, אליהו איתן 19 טל:03-9622918, כרמיאל, הלבונה 20/5 טל:04-9582824'
        ),
      ],
    }),
  },
  children: [new Paragraph("")],
};
export default headerFooterSection;
