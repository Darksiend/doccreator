import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <Link to="/allDocx">
        <div className="links">All Docx</div>
      </Link>
      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
