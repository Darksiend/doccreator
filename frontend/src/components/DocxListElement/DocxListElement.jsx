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
        <p className='documnet-info-container-text'> כתובת:{docx.address} </p>
      </div>
      <img
        src={`https://docxcreateapp.onrender.com/upload/${docx.mainPhotos[0]}`}
        alt=''
      />
      <Link className='list-btn' to={`/docx/${docx._id}`}>
        לפתוח דוח
      </Link>
      <button className='list-btn' onClick={onClickRemove}>
        למחוק דוח זה
      </button>
    </div>
  );
};

export default DocxListElement;
