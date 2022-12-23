import React, { useState } from "react";
import axios from "../axios";
import { FileDownload } from "js-file-download";

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

  const generateAndDownloadDocx = () => {
    let docxObj = {
      numberOfDocument: "1",
      agreementNum: "4321",
      numberOfFloors: numberOfFloors,
      floors: [
        {
          number: 0,
          isMartef: true,
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
        },
        {
          number: 1,
          isMartef: true,
          isHatah: false,
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
        },
      ],
      user: "Anton",
      date: "12.12.2022",
      images: [],
    };
    axios
      .post("/generate", { docxObj })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };
  const downloadDocx = () => {
    axios()
      .get("/download")
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
      <button onClick={generateAndDownloadDocx}>Generate!</button>
      <a href="https://docxcreateapp.onrender.com/download">
        <button>Download docx!</button>
      </a>
    </>
  );
};

export default CreatingDocx;
