import React, { useEffect } from "react";
import "./AllDocx.css";
const AllDocx = () => {
  useEffect(() => {
    console.log("Eff");
  }, []);
  return <div className="AllDocx"></div>;
};

export default AllDocx;
