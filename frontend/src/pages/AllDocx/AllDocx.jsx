import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocxs } from "../../redux/slices/docx";
import DocxListElement from "../../components/DocxListElement/DocxListElement";

const AllDocx = () => {
  const { docxs } = useSelector((state) => state.docxs);
  const dispatch = useDispatch();
  let isLoaded = docxs.status === "loaded";
  console.log(isLoaded);
  useEffect(() => {
    dispatch(fetchDocxs());
  }, []);
  console.log(docxs);
  return (
    <div className="AllDocx">
      {isLoaded ? (
        docxs.map((docx) => <DocxListElement docx={docx} />)
      ) : (
        <>Loading!!!</>
      )}
    </div>
  );
};

export default AllDocx;
