import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocxs } from "../../redux/slices/docx";
import DocxListElement from "../../components/DocxListElement/DocxListElement";
import Skeleton from "../../components/Sceleton/Skeleton";
import ThreeDots from "../../components/Sceleton/Skeleton";
import { Link } from "react-router-dom";

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
    <div className="AllDocx">
      <h1>הדוחות שלך</h1>
      {isLoaded ? (
        docxs.items.length === 0 ? (
          <p>
            עדיין לא יצרת דוחות. אפשר לעשות את זה <Link to={`/docx`}>פה</Link>
          </p>
        ) : (
          docxs.items.map((docx) => <DocxListElement docx={docx} />)
        )
      ) : (
        <ThreeDots />
      )}
    </div>
  );
};

export default AllDocx;
