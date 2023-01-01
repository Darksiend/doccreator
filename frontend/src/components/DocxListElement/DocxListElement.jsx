import React from "react";
import "./DocxListElement.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { deleteDocx } from "../../redux/slices/docx";
const DocxListElement = (props) => {
  const dispatch = useDispatch();
  let docx = props.docx;
  const onClickRemove = () => {
    if (window.confirm("You sure?")) {
      dispatch(deleteDocx(docx._id));
    }
  };

  return (
    <div className="DocxListElement">
      <h3>{docx.numberOfDocument}מספר דוח </h3>
      <h3>{docx.projectName}שם הפרוירט </h3>
      <Link to={`/docx/${docx._id}`}>Open DOCX</Link>
      <button onClick={onClickRemove}>למחוק דוח זה</button>
    </div>
  );
};

export default DocxListElement;
