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

export const getOne = async (req, res) => {
  console.log(params);
  try {
    const postId = req.params.id;
    DocModel.findOne({ _id: postId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Cant Get this Pos t" });
      }
      if (!doc) {
        return res.status(404).json({ msg: "Post not consist" });
      }
      res.json(doc);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Unsuccessful Get That Post" });
  }
};
