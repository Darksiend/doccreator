import React, { useState } from "react";
import axios from "../axios";
import { FileDownload } from "js-file-download";
import "./CreatingDocx.css";

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
          kindsOfTikraArr: ["מקשית", "צלעות"],
          kindOfTikra: "מקשית",
        },
        kirot: {
          isHatah: false,
          kindOfBeton: ["מבטון דבש", "מבטון מזוין", "בטון לא מזוין"],
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

  const tikraKindOnChange = (event, floorNumber) => {
    docxObj.floors[floorNumber].tikra.kindOfTikra = event.target.value;
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
          <h3>תקרע</h3>
          <p>סוג התקרע</p>
          <select
            onChange={(event) => tikraKindOnChange(event, floor.number)}
            name="kindOfTikra"
            id="kindOfTikra"
          >
            {floor.tikra.kindsOfTikraArr.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          {floor.tikra.kindOfTikra === ""}
          <h3>קורות</h3>
          <h3>עמודים</h3>
          <h3>קירות</h3>
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
