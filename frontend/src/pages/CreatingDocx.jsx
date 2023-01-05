import React, { useEffect, useState } from "react";
import axios from "../axios";

import "./CreatingDocx.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const CreatingDocx = () => {
  let params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isNewDocx, setIsNewDocx] = useState(true);
  const [isGeneratePressed, setIsGeneratePressed] = useState(false);
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
    mainPhotos: [],
  });
  console.log("State: ", docxObj);

  useEffect(() => {
    console.log(params);
    if (params.id) {
      setIsNewDocx(false);
      console.log("Have params");
      const { data } = axios
        .get(`/docxs/${params.id}`)
        .then((r) => {
          setDocxObj(r.data);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
      console.log("data", data);
    } else {
      setIsLoading(false);
    }
  }, []);
  const nameOnChangeHandler = (event) => {
    let id = event.target.id;
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
        mainPlan: { img: [] },
        number: 0,
        isMartef: false,
        tikra: {
          isHatah: false,
          kindsOfTikraArr: ["מקשית", "צלעות"],
          kindOfTikra: "מקשית",
          oviKisyiBeton: "",
          oviTikra: "",
          img: [],
          tableImg: [],
          scanImg: [],
          hatahImg: [],
          koter: "",
        },
        kirot: {
          isHatah: false,
          kindOfBeton: ["מבטון דבש", "מבטון מזוין", "בטון לא מזוין"],
          img: [],
          tableImg: [],
          scanImg: [],
          hatahImg: [],
        },
        korot: {
          isHatah: false,
          img: [],
          tableImg: [],
          scanImg: [],
          hatahImg: [],
        },
        amydim: {
          isHatah: false,
          numAmydim: 1,
          img: [],
          amydimArr: [],
          koterBarzel: "",
          amydNumber: "",
          tableImg: [],
          scanImg: [],
          hatahImg: [],
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
      .then((r) => {
        setIsGeneratePressed(true);
        addDocxToDB();
      })
      .catch((e) => console.log(e));
  };

  const addDocxToDB = () => {
    axios
      .post("/docxs", docxObj)
      .then((r) => setDocxObj(r.data))
      .catch((e) => console.log(e));
  };

  const addPhotoToImg = (url) => {
    console.log(url.split("/"));
    let FloorNumber = url.split("/")[1];
    let resFloors = docxObj.floors;

    console.log(resFloors[FloorNumber]);
    if (url.includes("table")) {
      resFloors[FloorNumber][url.split("/")[2]].tableImg.push(url);
      setDocxObj({ ...docxObj, floors: resFloors });
    } else if (url.includes("scans")) {
      resFloors[FloorNumber][url.split("/")[2]].scanImg.push(url);
      setDocxObj({ ...docxObj, floors: resFloors });
    } else if (url.includes("mainPhotos")) {
      let resMainPhotos = docxObj.mainPhotos;
      resMainPhotos.push(url);
      setDocxObj({ ...docxObj, mainPhotos: resMainPhotos });
    } else {
      resFloors[FloorNumber][url.split("/")[2]].img.push(url);
      setDocxObj({ ...docxObj, floors: resFloors });
    }
  };

  const updateDocxOnClick = () => {
    axios
      .patch(`/docxs/${docxObj._id}`, docxObj)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  const tikraKindOnChange = (event, floorNumber) => {
    let resFloors = docxObj.floors;
    resFloors[floorNumber].tikra.kindOfTikra = event.target.value;
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const handleFileChange = async (event, docxObj) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post(`/upload/${event.target.id}`, formData);
      if (data) {
        console.log(data);
        console.log(event.target.id.split("/"));
        let url = `${event.target.id}/${data.fileName}`;
        console.log("url", url);
        addPhotoToImg(url);
        updateDocxOnClick();
      }
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

  const amydInputOnChange = (event, floor, index) => {
    console.log(floor);
    console.log("Amydim Target ID:", event.target.id);
    console.log("Amydim Target Value", event.target.value);
    let resFloors = docxObj.floors;
    let targetID = event.target.id;
    resFloors[floor.number].amydim.amydimArr[index][targetID] =
      event.target.value;
    console.log(resFloors[floor.number].amydim.amydimArr[index].number);
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const addAmyd = (event, floor, index) => {
    console.log(floor.number);
    let floorNumber = floor.number;
    let resFloors = docxObj.floors;
    console.log(resFloors);
    resFloors[floorNumber].amydim.amydimArr.push({
      number: "",
      sizes: "",
      width_size: "",
      height_size: "",
    });
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const deleteAmyd = (event, floor, index) => {
    let floorNumber = floor.number;
    let resFloors = docxObj.floors;
    // resFloors[floorNumber].amydim.amydimArr[index] = {};
    console.log("Index: ", index);
    resFloors[floorNumber].amydim.amydimArr.splice(index - 1, 1);
    console.log("Res Floors at delete amyd", resFloors[floorNumber]);
    setDocxObj({ ...docxObj, floors: resFloors });
  };

  const tikraCheckBoxOnChange = (event, floorNumber) => {
    let resFloors = docxObj.floors;
    resFloors[floorNumber].tikra.isHatah =
      !resFloors[floorNumber].tikra.isHatah;
    setDocxObj({ ...docxObj, floors: resFloors });
  };
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/docx/${docxObj._id}`);
  }, [docxObj._id]);

  return (
    <div className='creatingDocx'>
      <h1>יצירת דוח</h1>
      <input
        onChange={(event) =>
          setDocxObj({ ...docxObj, numberOfDocument: event.target.value })
        }
        type='text'
        placeholder='מספר דו״ח'
        value={docxObj.numberOfDocument}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, agreementNum: event.target.value });
        }}
        type='text'
        placeholder='הסכם'
        value={docxObj.agreementNum}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, customerName: event.target.value });
        }}
        type='text'
        placeholder='שם המזמין'
        value={docxObj.customerName}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, placeOfCustomer: event.target.value });
        }}
        type='text'
        placeholder='מען המזמין'
        value={docxObj.placeOfCustomer}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, address: event.target.value });
        }}
        type='text'
        placeholder='כתובת'
        value={docxObj.address}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, projectName: event.target.value });
        }}
        type='text'
        placeholder='שם הפרויקט'
        value={docxObj.projectName}
        required
      />
      <input
        onChange={(event) => {
          floorOnChange(event);
        }}
        type='text'
        placeholder='מספר הקומות'
        value={docxObj.numberOfFloors}
        required
      />
      <input
        onChange={(event) => {
          setDocxObj({ ...docxObj, date: event.target.value });
        }}
        type='date'
        placeholder='תאריך הבדיקה'
        value={docxObj.date}
      />
      {isNewDocx && !isGeneratePressed ? (
        <button className='btn' onClick={generateDocx}>
          התחל ליצור מסמך
        </button>
      ) : (
        <>
          <h1>חזיתות</h1>
          <input
            id={`${docxObj.numberOfDocument}/mainPhotos`}
            type='file'
            onChange={(event) => handleFileChange(event, docxObj)}
          />
          {docxObj.mainPhotos.length > 0 ? (
            docxObj.mainPhotos.map((img) => (
              <img
                className='previewImg'
                src={`https://docxcreateapp.onrender.com/upload/${img}`}
                alt=''
              />
            ))
          ) : (
            <></>
          )}
          {docxObj.floors.map((floor) => (
            <div className='FloorConfigComponent'>
              <input
                type='text'
                id={floor.number}
                placeholder='שם קומה'
                onChange={(event) => {
                  nameOnChangeHandler(event);
                }}
              />
              <h1>{floor.name}</h1>

              <p>מיפוי קונסטרוקציה {floor.name}</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/mainPlan`}
                type='file'
                onChange={(event) =>
                  handleFileChange(event, docxObj, floor.number)
                }
              />
              {floor.mainPlan.img.length > 0 ? (
                floor.mainPlan.img.map((img) => (
                  <img
                    className='previewImg'
                    src={`https://docxcreateapp.onrender.com/upload/${img}`}
                    alt=''
                  />
                ))
              ) : (
                <></>
              )}
              <h3>תקרע</h3>
              <p>סוג התקרע</p>
              <select
                onChange={(event) => tikraKindOnChange(event, floor.number)}
                name='kindOfTikra'
                id='kindOfTikra'
                value={floor.number.kindOfTikra}
              >
                {floor.tikra.kindsOfTikraArr.map((option, index) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
              {floor.tikra.kindOfTikra === "צלעות" ? (
                <div className='tikraKindOptionsInputs'>
                  <p> סוג התקרע צלעות:</p>
                  <p>טאבלה צלעות</p>
                  <input
                    id={`${docxObj.numberOfDocument}/${floor.number}/tikra/table`}
                    type='file'
                    onChange={handleFileChange}
                  />
                  <p>תוצאות סריקת פרוסקן במקשית מסי</p>
                  <input
                    id={`${docxObj.numberOfDocument}/${floor.number}/tikra/scans`}
                    type='file'
                    onChange={handleFileChange}
                  />
                  {/*<label htmlFor="motot"> מוטות נתגלו</label>*/}
                  {/*<input type="number" id="motot" />*/}
                  <div className='koterInput'>
                    <label htmlFor='koter'>קוטר</label>
                    <input
                      id='koter'
                      type='number'
                      value={floor.tikra.koter}
                      onChange={(event) =>
                        tikraInputOnChange(event, floor.number)
                      }
                    />
                    {/*<label htmlFor="koter">&#177;</label>*/}
                    {/*<input id="koter" type="number" />*/}
                    <label htmlFor='koter'>מ״מ</label>
                  </div>
                  <div className='oviKisyiBetonInput'>
                    <label htmlFor='oviKisyiBeton'>עובי כיסוי הבטון</label>
                    <input
                      type='number'
                      id='oviKisyiBeton'
                      value={floor.tikra.oviKisyiBeton}
                      onChange={(event) =>
                        tikraInputOnChange(event, floor.number)
                      }
                    />
                    <label htmlFor='oviKisyiBeton'>ס״מ</label>
                  </div>
                </div>
              ) : (
                <div className='tikraKindOptionsInputs'>
                  <p>מקשית</p>
                  <p>טאבלה סריקות מקשית</p>
                  <input
                    id={`${docxObj.numberOfDocument}/${floor.number}/tikra/table`}
                    type='file'
                    onChange={handleFileChange}
                  />
                  {floor.tikra.tableImg.length > 0 ? (
                    floor.tikra.tableImg.map((img) => (
                      <img
                        className='previewImg'
                        src={`https://docxcreateapp.onrender.com/upload/${img}`}
                        alt=''
                      />
                    ))
                  ) : (
                    <></>
                  )}
                  <p>תוצאות סריקת פרוסקן במקשית מסי</p>
                  <input
                    id={`${docxObj.numberOfDocument}/${floor.number}/tikra/scans`}
                    type='file'
                    onChange={handleFileChange}
                  />
                  {floor.tikra.scanImg.length > 0 ? (
                    floor.tikra.scanImg.map((img) => (
                      <img
                        className='previewImg'
                        src={`https://docxcreateapp.onrender.com/upload/${img}`}
                        alt=''
                      />
                    ))
                  ) : (
                    <></>
                  )}
                  <div className='inputs'>
                    <label htmlFor='oviKisyiBeton'>עובי כיסוי הבטון</label>
                    <input
                      onChange={(event) =>
                        tikraInputOnChange(event, floor.number)
                      }
                      value={floor.tikra.oviKisyiBeton}
                      type='number'
                      id='oviKisyiBeton'
                    />
                    <label htmlFor='oviKisyiBeton'>ס״מ</label>
                  </div>
                  <div className='inputs'>
                    <label htmlFor=''>עובי תקרה</label>
                    <input
                      type='number'
                      id='oviTikra'
                      onChange={(event) =>
                        tikraInputOnChange(event, floor.number)
                      }
                      value={floor.tikra.oviTikra}
                    />
                  </div>
                  <div className='inputs'>
                    <p>יש חתך?</p>
                    <input
                      onChange={(event) =>
                        tikraCheckBoxOnChange(event, floor.number)
                      }
                      value={true}
                      type='checkbox'
                    />
                  </div>
                  {floor.tikra.isHatah ? (
                    <>
                      <p>תמונות של חתך:</p>
                      <input
                        className='file-input'
                        id={`${docxObj.numberOfDocument}/${floor.number}/tikra/hatah`}
                        type='file'
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
                id={`${docxObj.numberOfDocument}/${floor.number}/korot/table`}
                type='file'
                onChange={handleFileChange}
              />
              {floor.korot.tableImg.length > 0 ? (
                floor.korot.tableImg.map((img) => (
                  <img
                    className='previewImg'
                    src={`https://docxcreateapp.onrender.com/upload/${img}`}
                    alt=''
                  />
                ))
              ) : (
                <></>
              )}

              <p>תוצאות סריקת פרוסקן קורות</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/korot/scans`}
                type='file'
                onChange={handleFileChange}
              />
              {floor.korot.scanImg.length > 0 ? (
                floor.korot.scanImg.map((img) => (
                  <img
                    className='previewImg'
                    src={`https://docxcreateapp.onrender.com/upload/${img}`}
                    alt=''
                  />
                ))
              ) : (
                <></>
              )}
              <h3>עמודים</h3>
              <p>טאבלת עמודים</p>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/amydim/`}
                type='file'
                onChange={handleFileChange}
              />
              {floor.amydim.amydimArr.map((amyd, index) => (
                <div className='amyd-input-container'>
                  <input
                    id={"number"}
                    onChange={(event) => amydInputOnChange(event, floor, index)}
                    type='number'
                    placeholder='מס עמוד'
                    value={floor.amydim.amydimArr[index].number}
                  ></input>
                  <input
                    id='sizes'
                    type='number'
                    placeholder='מידות'
                    onChange={(event) => amydInputOnChange(event, floor, index)}
                    value={floor.amydim.amydimArr[index].sizes}
                  ></input>
                  <input
                    id='width_size'
                    type='number'
                    placeholder='רוחב מוטות'
                    onChange={(event) => amydInputOnChange(event, floor, index)}
                    value={floor.amydim.amydimArr[index].width_size}
                  ></input>
                  <input
                    id='height_size'
                    type='number'
                    placeholder='אורך מוטות'
                    onChange={(event) => amydInputOnChange(event, floor, index)}
                    value={floor.amydim.amydimArr[index].height_size}
                  ></input>
                  <button
                    onClick={(event) => {
                      deleteAmyd(event, floor, index);
                    }}
                  >
                    למחוק את העמוד
                  </button>
                </div>
              ))}

              <button
                onClick={(event) => {
                  addAmyd(event, floor);
                }}
              >
                הוסף עמוד
              </button>

              {floor.amydim.img.length > 0 ? (
                floor.amydim.img.map((img) => (
                  <img
                    className='previewImg'
                    src={`https://docxcreateapp.onrender.com/upload/${img}`}
                    alt=''
                  />
                ))
              ) : (
                <></>
              )}
              <div className='inputs'>
                <label htmlFor=''>קוטר ברזל</label>
                <input
                  type='number'
                  id='koterBarzel'
                  onChange={(event) => amydimInputOnChange(event, floor.number)}
                />
              </div>
              <div className='inputs'>
                <label htmlFor=''>מס עמוד</label>
                <input
                  type='number'
                  id='amydNumber'
                  onChange={(event) => amydimInputOnChange(event, floor.number)}
                />
              </div>
              <h3>קירות</h3>
              <input
                id={`${docxObj.numberOfDocument}/${floor.number}/kirot/table`}
                type='file'
                onChange={handleFileChange}
              />
              {floor.kirot.tableImg.length > 0 ? (
                floor.kirot.tableImg.map((img) => (
                  <img
                    className='previewImg'
                    src={`https://docxcreateapp.onrender.com/upload/${img}`}
                    alt=''
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      )}

      <button className='btn' onClick={generateDocx}>
        שמירת דו״ח
      </button>
      <a className='btn' href='https://docxcreateapp.onrender.com/download'>
        <button>הורדת דוח</button>
      </a>

      {isNewDocx ? (
        <>
          <button className='btn' onClick={addDocxToDB}>
            Add This Docx To DB!
          </button>
        </>
      ) : (
        <>
          <button className='btn' onClick={updateDocxOnClick}>
            לעדכן את הדוח במאגר מידע
          </button>
        </>
      )}
    </div>
  );
};

export default CreatingDocx;
