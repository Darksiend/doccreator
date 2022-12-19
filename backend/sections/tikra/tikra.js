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

const tikraSection = {
  properties: {},
  children: [new Paragraph({ text: "tikra" })],
};

export default tikraSection;
