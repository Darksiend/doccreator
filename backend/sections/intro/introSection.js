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

let introSection = {
  properties: { type: SectionType.NEXT_PAGE },
  children: [new Paragraph({ children: [new TextRun({ text: "מבוא" })] })],
};
export default introSection;
