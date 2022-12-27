import React, { useEffect } from "react";
import "./AllDocx.css";
import axios from "../../axios";
const AllDocx = () => {
  useEffect(() => {
    const { data } = axios.get("/docxs");
    console.log(data);
  }, []);
  return <div className="AllDocx"></div>;
};

export default AllDocx;
