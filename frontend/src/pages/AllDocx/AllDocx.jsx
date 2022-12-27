import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocxs } from "../../redux/slices/docx";

const AllDocx = () => {
  const { docxs } = useSelector((state) => state.docxs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocxs());
  }, []);
  console.log(docxs);
  return <div className="AllDocx"></div>;
};

export default AllDocx;
