import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="links">
        <div className="link-item">יציאה</div>
        <Link to="/allDocx">
          <div className="link-item">הדוחות שלי</div>
        </Link>
      </div>

      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
