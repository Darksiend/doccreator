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
  const removeDocx = () => {
    axios
      .delete(`/remove/${docx._id}`)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  return (
    <div className="DocxListElement">
      <h3>{docx.numberOfDocument}מספר דוח</h3>
      <Link to={`/docxs/${docx._id}`}>Open DOCX</Link>
      <button onClick={removeDocx}>למחוק דוח זה</button>
    </div>
  );
};

export default DocxListElement;
