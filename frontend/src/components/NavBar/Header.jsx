import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <div className="links">
        <NavLink to={"/"} className="link-item">
          יציאה
        </NavLink>
        <NavLink className="link-item" to={"/create"}>
          יצירת דוח
        </NavLink>
      </div>

      <div className="logo">הכנת דוחות אוטומטית</div>
    </div>
  );
};

export default Header;
