import tikraSection from "../../tikra/tikra.js";

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

function Floor(number) {
  this.properties = { type: SectionType.NEXT_PAGE };
  this.children = [new Paragraph({ text: `Floor number ${number}` })];
}

export default Floor;
