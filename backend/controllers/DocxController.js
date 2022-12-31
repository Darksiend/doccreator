import DocModel from "../models/Doc.js";
export const create = async (req, res) => {
  console.log(req.body);
  try {
    const doc = new DocModel({
      numberOfDocument: req.body.numberOfDocument,
      address: req.body.address,
      agreementNum: req.body.agreementNum,
      numberOfFloors: req.body.numberOfFloors,
      projectName: req.body.projectName,
      placeOfCustomer: req.body.placeOfCustomer,
      floors: req.body.floors,
      customerName: req.body.customerName,
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

export const getOne = async (req, res) => {
  console.log(req.params);
  try {
    const docxId = req.params.id;
    DocModel.findOne({ _id: docxId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Cant Get this Docx" });
      }
      if (!doc) {
        return res.status(404).json({ msg: "Docx not consist" });
      }
      res.json(doc);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful Get That Post" });
  }
};

export const remove = async (req, res) => {
  try {
    const docxId = req.params.id;
    DocModel.findOneAndDelete({ _id: docxId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Cant Delete this Docx" });
      }
      if (!doc) {
        return res.status(404).json({ msg: "Docx not consist" });
      }
      console.log(doc);
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
  }
};
