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
    <div className='DocxListElement'>
      <div className='documnet-info-container'>
        <p className='documnet-info-container-text'>
          {docx.numberOfDocument} :מספר דוח
        </p>
        <p className='documnet-info-container-text'>
          {docx.agreementNum} :מספר הסכם
        </p>
      </div>
      <Link to={`/docx/${docx._id}`}>Open DOCX</Link>
      <img
        src={`https://docxcreateapp.onrender.com${docx.mainPhoto[0]}`}
        alt=''
      />
      <button onClick={onClickRemove}>למחוק דוח זה</button>
    </div>
  );
};

export default DocxListElement;
