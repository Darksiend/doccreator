import React from "react";
import "./FloorConfigComponent.css";
const FloorConfigComponent = ({ number }) => {
  return (
    <div className="FloorConfigComponent">
      Floor Config Number {number}, with name {}
    </div>
  );
};

export default FloorConfigComponent;
