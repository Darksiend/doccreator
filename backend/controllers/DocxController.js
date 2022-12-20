import DocModel from "../models/Doc.js";
export const create = async (req, res) => {
  console.log(req.body);
  try {
    const doc = new DocModel({
      numberOfDocument: req.body.numberOfDocument,
      agreementNum: req.body.agreementNum,
      numberOfFloors: req.body.numberOfFloors,
      floors: req.body.floors,
      user: req.body.user,
      date: req.body.date,
      images: [],
    });

    const docx = await doc.save();

    res.json(docx);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful creating Post" });
  }
};

export const getAll = async (req, res) => {
  try {
    const docxs = await DocModel.find();
    res.json(docxs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unsuccessful Get All Post" });
  }
};
