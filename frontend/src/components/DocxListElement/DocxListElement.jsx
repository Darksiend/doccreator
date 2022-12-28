import React from "react";
import "./DocxListElement.css";
const DocxListElement = (props) => {
  let docx = props.docx;
  return <div className="DocxListElement">{docx.numberOfDocument}</div>;
};

export default DocxListElement;
