import React from "react";
import "./DocxListElement.css";
import { Link } from "react-router-dom";
const DocxListElement = (props) => {
  let docx = props.docx;
  return (
    <div className="DocxListElement">
      {docx.numberOfDocument}
      <Link to={`/docxs/${docx._id}`}>Open DOCX</Link>
    </div>
  );
};

export default DocxListElement;
