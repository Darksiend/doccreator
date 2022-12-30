import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="links">
        <Link to={"/"} className="link-item">
          יציאה
        </Link>
        <Link className="link-item" to={"/"}>
          דוחות שלי
        </Link>
      </div>

      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
