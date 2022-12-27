import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { fetchDocxs } from "../../redux/slices/docx";
const AllDocx = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocxs());
  }, []);
  return <div className="AllDocx"></div>;
};

export default AllDocx;
