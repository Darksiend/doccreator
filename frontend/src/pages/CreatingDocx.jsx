import React, { useState } from "react";
import axios from "../axios";

const CreatingDocx = () => {
  const [numberOfDocument, setNumberOfDocument] = useState("");
  const [agreementNum, setAgreementNum] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [floors, setFloors] = useState([]);
  if (numberOfFloors >= 1) {
    let arrOfFloors;
    for (let i = 0; i < numberOfFloors; i++) {}
  }
  let docx = {
    numberOfDocument: numberOfDocument,
    agreementNum: agreementNum,
    numberOfFloors: numberOfFloors,
    floors: floors,
  };
  console.log(docx);

  const createDocx = () => {
    axios
      .post("/generate", docx)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  const downloadDocx = () => {
    axios()
      .get("/download", { responseType: "blob" })
      .then((r) => console.log("Docx downloaded with response: ", r))
      .catch((e) => console.log("Cant Download Docx With Response:", e));
  };
  console.log(docx);
  return (
    <>
      <h1>Creating Docx</h1>
      <input
        onChange={(event) => setNumberOfDocument(event.target.value)}
        type="text"
        placeholder="דוח מספר"
      />
      <input
        onChange={(event) => {
          setAgreementNum(event.target.value);
        }}
        type="text"
        placeholder="הסכם"
      />
      <input
        onChange={(event) => {
          setNumberOfFloors(event.target.value);
        }}
        type="text"
        placeholder="מספר קומות"
      />
      <button onClick={createDocx}>Creating!</button>
      <button onClick={downloadDocx}>Download docx!</button>
    </>
  );
};

export default CreatingDocx;
