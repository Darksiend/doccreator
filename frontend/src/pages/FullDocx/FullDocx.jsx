import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import "./FullDocx.css";
import login from "../Login/Login";

const FullDocx = () => {
  // const [numberOfDocument, setNumberOfDocument] = useState("");
  // const [agreementNum, setAgreementNum] = useState("");
  // const [numberOfFloors, setNumberOfFloors] = useState("");
  // const [floors, setFloors] = useState([]);
  const [docxObj, setDocxObj] = useState({
    numberOfDocument: "",
    name: "",
    address: "",
    agreementNum: "",
    numberOfFloors: "",
    placeOfCustomer: "",
    floors: [],
    user: "Anton",
    date: "12.12.2022",

    customerName: "",
    projectName: "",
  });
  let params = useParams();
  console.log("State: ", docxObj);
  useEffect(() => {
    console.log(params);
    if (params.id) {
      console.log("Have params");
      const { data } = axios
        .get(`/docxs/${params.id}`)
        .then((r) => console.log(r.data));
      console.log("data", data);
    }
  }, []);

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
          oviKisyiBeton: "",
          oviTikra: "",
          img: [],
        },
        kirot: {
          isHatah: false,
          kindOfBeton: ["מבטון דבש", "מבטון מזוין", "בטון לא מזוין"],
          img: [],
        },
        korot: {
          isHatah: false,
          img: [],
        },
        amydim: {
          isHatah: false,
          img: [],
          koterBarzel: "",
          amydNumber: "",
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
      alert("שגיא!");
    }
  };

  const tikraInputOnChange = (event, floorNumber) => {
    let resFloors = docxObj.floors;
    let param = event.target.id;
    resFloors[floorNumber].tikra[param] = event.target.value;
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const amydimInputOnChange = (event, floorNumber) => {
    let resFloors = docxObj.floors;
    let param = event.target.id;
    resFloors[floorNumber].amydim[param] = event.target.value;
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const tikraCheckBoxOnChange = (event, floorNumber) => {
    let resFloors = docxObj.floors;
    resFloors[floorNumber].tikra.isHatah =
      !resFloors[floorNumber].tikra.isHatah;
    setDocxObj({ ...docxObj, floors: resFloors });
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
          setDocxObj({ ...docxObj, customerName: event.target.value });
        }}
        type="text"
        placeholder="שם המזמין"
        value={docxObj.customerName}
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, placeOfCustomer: event.target.value });
        }}
        type="text"
        placeholder="מען המזמין"
        value={docxObj.placeOfCustomer}
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, address: event.target.value });
        }}
        type="text"
        placeholder="כתובת"
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, name: event.target.value });
        }}
        type="text"
        placeholder="שם הפרויקט"
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, date: event.target.value });
        }}
        type="date"
        placeholder="תאריך"
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
            placeholder="שם קומה"
            onChange={(event) => {
              nameOnChangeHandler(event);
            }}
          />
          <h1>{floor.name}</h1>

          <p>מיפוי קונסטרוקציה {floor.name}</p>
          <input
            id={`${docxObj.numberOfDocument}/${floor.number}/mainPlan/`}
            type="file"
            onChange={handleFileChange}
          />
          <h3>תקרע</h3>
          <p>סוג התקרע</p>
          <select
            onChange={(event) => tikraKindOnChange(event, floor.number)}
            name="kindOfTikra"
            id="kindOfTikra"
          >
            {floor.tikra.kindsOfTikraArr.map((option, index) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          {floor.tikra.kindOfTikra === "צלעות" ? (
            <div className="tikraKindOptionsInputs">
              <p> סוג התקרע צלעות:</p>
              <p>טאבלה צלעות</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/tikra`}
                type="file"
                onChange={handleFileChange}
              />
              <p>תוצאות סריקת פרוסקן במקשית מסי</p>
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
              <p>טאבלה סריקות מקשית</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/tikra/table`}
                type="file"
                onChange={handleFileChange}
              />
              <p>תוצאות סריקת פרוסקן במקשית מסי</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/tikra/scans`}
                type="file"
                onChange={handleFileChange}
              />
              <input id="reshet" type="number" />
              {/*<div className="inputs">*/}
              {/*  <label htmlFor="koter">קוטר</label>*/}
              {/*  <input id="koter" type="number" />*/}
              {/*  <label htmlFor="koter">&#177;</label>*/}
              {/*  <input id="koter" type="number" />*/}
              {/*  <label htmlFor="koter">מ״מ</label>*/}
              {/*</div>*/}
              <div className="inputs">
                <label htmlFor="oviKisyiBeton">עובי כיסוי הבטון</label>
                <input
                  onChange={(event) => tikraInputOnChange(event, floor.number)}
                  type="number"
                  id="oviKisyiBeton"
                />
                <label htmlFor="oviKisyiBeton">ס״מ</label>
              </div>
              {/*<div className="inputs">*/}
              {/*  <label htmlFor="reshet">בצד פנימי מזוין ברשת</label>*/}
              {/*  <input id="reshet" type="number" />*/}
              {/*  <label htmlFor="koter">&#177;</label>*/}
              {/*  <input id="koter" type="number" />*/}
              {/*  <label htmlFor="koter">מ״מ</label>*/}
              {/*</div>*/}
              {/*<div className="inputs">*/}
              {/*  <label htmlFor="rohavKirot">רוחבי הקירות</label>*/}
              {/*  <input type="number" id="rohavKirot" />*/}
              {/*  <label htmlFor="rohavKirot">מ״מ</label>*/}
              {/*</div>*/}
              <div className="inputs">
                <label htmlFor="">עובי תקרה</label>
                <input
                  type="number"
                  id="oviTikra"
                  onChange={(event) => tikraInputOnChange(event, floor.number)}
                />
              </div>
              <div className="inputs">
                <p>יש חתך?</p>
                <input
                  onChange={(event) =>
                    tikraCheckBoxOnChange(event, floor.number)
                  }
                  value={true}
                  type="checkbox"
                />
              </div>
              {floor.tikra.isHatah ? (
                <>
                  <p>תמונות של חתך:</p>
                  <input
                    className="file-input"
                    id={`${docxObj.numberOfDocument}/${floor.number}/tikra/hatah`}
                    type="file"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          )}
          <h3>קורות</h3>
          <p>טאבלה פרוסקן</p>
          <input
            id={`${docxObj.numberOfDocument}/${floor.number}/korot/proscanTable`}
            type="file"
            onChange={handleFileChange}
          />
          <p>תוצאות סריקת פרוסקן קורות</p>
          <input
            id={`${docxObj.numberOfDocument}/${floor.number}/korot/scans`}
            type="file"
            onChange={handleFileChange}
          />
          <h3>עמודים</h3>
          <p>טאבלת עמודים</p>
          <input
            id={`${docxObj.numberOfDocument}/${floor.number}/amydim/`}
            type="file"
            onChange={handleFileChange}
          />
          <div className="inputs">
            <label htmlFor="">קוטר ברזל</label>
            <input
              type="number"
              id="koterBarzel"
              onChange={(event) => amydimInputOnChange(event, floor.number)}
            />
          </div>
          <div className="inputs">
            <label htmlFor="">מס עמוד</label>
            <input
              type="number"
              id="amydNumber"
              onChange={(event) => amydimInputOnChange(event, floor.number)}
            />
          </div>
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

export default FullDocx;
