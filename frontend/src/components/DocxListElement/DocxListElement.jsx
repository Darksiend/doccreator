import React from "react";
import "./DocxListElement.css";
import { Link } from "react-router-dom";
const DocxListElement = (props) => {
  let docx = props.docx;
  return (
    <div className="DocxListElement">
      <h3>{docx.numberOfDocument}מספר דוח</h3>
      <Link to={`/docxs/${docx._id}`}>Open DOCX</Link>
    </div>
  );
};

export default DocxListElement;
