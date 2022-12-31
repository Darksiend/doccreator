import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="links">
        <NavLink to={"/"} className="link-item">
          דוחות שלי
        </NavLink>
        <NavLink className="link-item" to={"/docx"}>
          יצירת דוח
        </NavLink>
      </div>

      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
