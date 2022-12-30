import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="links">
        <Link to="/allDocx">
          <div className="link-item">הדוחות שלי</div>
        </Link>
        <div className="links">יציאה</div>
      </div>

      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
