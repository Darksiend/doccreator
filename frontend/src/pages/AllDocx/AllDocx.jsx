import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocxs } from "../../redux/slices/docx";
import DocxListElement from "../../components/DocxListElement/DocxListElement";
import Skeleton from "../../components/Sceleton/Skeleton";
import ThreeDots from "../../components/Sceleton/Skeleton";
import { Link } from "react-router-dom";
import DocxIcon from "../../assets/AllDocx/filetype-docx.svg";
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";
const AllDocx = () => {
  const { docxs } = useSelector((state) => state.docxs);
  const dispatch = useDispatch();
  let isLoaded = docxs.status === "loaded";
  console.log(isLoaded);
  useEffect(() => {
    dispatch(fetchDocxs());
  }, []);
  console.log(docxs.items);
  return (
    <div className='AllDocx'>
      <h1>הדוחות שלך</h1>
      {isLoaded ? (
        docxs.items.length === 0 ? (
          <p>
            עדיין לא יצרת דוחות. אפשר לעשות את זה <Link to={`/docx`}>פה</Link>
          </p>
        ) : (
          <TransitionGroup>
            {docxs.items.map((docx) => (
              <CSSTransition classNames='transition'>
                <DocxListElement docx={docx} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )
      ) : (
        <ThreeDots />
      )}
      <Link className='all-docx-btn' to={"/docx"}>
        <img src={DocxIcon} alt='' /> יצירת דוח חדש
      </Link>
    </div>
  );
};

export default AllDocx;
