import React, { useState } from "react";
import axios from "../axios";
import { FileDownload } from "js-file-download";
import "./CreatingDocx.css";
import FloorConfigComponent from "../components/FloorConfigComponent";

const CreatingDocx = () => {
  const [numberOfDocument, setNumberOfDocument] = useState("");
  const [agreementNum, setAgreementNum] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [floors, setFloors] = useState([]);
  let docxObj = {
    numberOfDocument: numberOfDocument,
    agreementNum: agreementNum,
    numberOfFloors: numberOfFloors,
    floors: [],
    user: "Anton",
    date: "12.12.2022",
    images: [],
  };
  console.log("DOCX Obj: ", docxObj);
  if (numberOfFloors > 1) {
    for (let i = 0; i < numberOfFloors; i++) {
      let floor = {
        name: "",
        number: 0,
        isMartef: false,
        tikra: {
          isHatah: false,
        },
        kirot: {
          isHatah: false,
        },
        korot: {
          isHatah: false,
        },
        amydim: {
          isHatah: false,
        },
      };
      floor.number = i;
      docxObj.floors.push(floor);
    }
  }

  const nameOnChangeHandler = (event) => {
    let id = event.target.id;
    docxObj.floors[id].name = event.target.value;
  };

  const generateDocx = () => {
    axios
      .post("/generate", { docxObj })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  const addDocxToDB = () => {
    axios
      .post("/create", docxObj)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div className="creatingDocx">
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
        value={numberOfFloors}
      />
      {docxObj.floors.map((floor) => (
        <div className="FloorConfigComponent">
          <h1>{floor.name}</h1>
          <input
            type="text"
            id={floor.number}
            placeholder="name of element..."
            onChange={(event) => {
              nameOnChangeHandler(event);
            }}
          />
        </div>
      ))}
      <button onClick={generateDocx}>Generate!</button>
      <a href="https://docxcreateapp.onrender.com/download">
        <button>Download docx!</button>
      </a>
      <button onClick={addDocxToDB}>Add This Docx To DB!</button>
    </div>
  );
};

export default CreatingDocx;
