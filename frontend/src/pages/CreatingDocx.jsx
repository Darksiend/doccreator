import React, { useState } from "react";
import axios from "../axios";
import { FileDownload } from "js-file-download";
import "./CreatingDocx.css";

const CreatingDocx = () => {
  const [numberOfDocument, setNumberOfDocument] = useState("");
  const [agreementNum, setAgreementNum] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [floors, setFloors] = useState([]);
  const [docxObj, setDocxObj] = useState({
    numberOfDocument: "",
    agreementNum: "",
    numberOfFloors: "",
    floors: [],
    user: "Anton",
    date: "12.12.2022",
    images: [],
  });
  console.log("State: ", docxObj);
  let docxObj2 = {
    numberOfDocument: numberOfDocument,
    agreementNum: agreementNum,
    numberOfFloors: numberOfFloors,
    floors: [],
    user: "Anton",
    date: "12.12.2022",
    images: [],
  };

  const nameOnChangeHandler = (event) => {
    let id = event.target.id;
    // docxObj.floors[id].name = event.target.value;
    let newFloors = docxObj.floors;
    newFloors[id].name = event.target.value;

    setDocxObj({
      ...docxObj,
      floors: newFloors,
    });
  };

  const floorOnChange = (event) => {
    let floorsArr = [];
    for (let i = 0; i < event.target.value; i++) {
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
      floorsArr.push(floor);
    }
    setDocxObj({
      ...docxObj,
      floors: floorsArr,
      numberOfFloors: event.target.value,
    });
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
    // docxObj.floors[floorNumber].tikra.kindOfTikra = event.target.value;
    let resFloors = docxObj.floors;
    resFloors[floorNumber].tikra.kindOfTikra = event.target.value;
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post(`/upload/${event.target.id}`, formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="creatingDocx">
      <h1>הכנת דוח</h1>
      <input
        onChange={(event) =>
          setDocxObj({ ...docxObj, numberOfDocument: event.target.value })
        }
        type="text"
        placeholder="דוח מספר"
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, agreementNum: event.target.value });
        }}
        type="text"
        placeholder="הסכם"
      />
      <input
        onChange={(event) => {
          floorOnChange(event);
        }}
        type="text"
        placeholder="מספר קומות"
        value={docxObj.numberOfFloors}
      />
      {docxObj.floors.map((floor) => (
        <div className="FloorConfigComponent">
          <input
            type="text"
            id={floor.number}
            placeholder="name of element..."
            onChange={(event) => {
              nameOnChangeHandler(event);
            }}
          />
          <h1>{floor.name}</h1>
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
          {floor.tikra.kindOfTikra === "צלעות" ? (
            <div className="tikraKindOptionsInputs">
              <p> סוג התקרע צלעות:</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/tikra`}
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="motot"> מוטות נתגלו</label>
              <input type="number" id="motot" />
              <div className="koterInput">
                <label htmlFor="koter">קוטר</label>
                <input id="koter" type="number" />
                <label htmlFor="koter">&#177;</label>
                <input id="koter" type="number" />
                <label htmlFor="koter">מ״מ</label>
              </div>
              <div className="oviKisyiBetonInput">
                <label htmlFor="oviKisyiBeton">עובי כיסוי הבטון</label>
                <input type="number" id="oviKisyiBeton" />
                <label htmlFor="oviKisyiBeton">ס״מ</label>
              </div>
            </div>
          ) : (
            <div className="tikraKindOptionsInputs">
              <p>מקשית</p>
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
          )}
          <h3>קורות</h3>
          <h3>עמודים</h3>
          <h3>קירות</h3>
        </div>
      ))}
      <button className="btn" onClick={generateDocx}>
        Generate!
      </button>
      <a className="btn" href="https://docxcreateapp.onrender.com/download">
        <button>Download docx!</button>
      </a>
      <button className="btn" onClick={addDocxToDB}>
        Add This Docx To DB!
      </button>
    </div>
  );
};

export default CreatingDocx;
