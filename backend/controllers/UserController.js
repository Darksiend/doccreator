import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: "Error" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: "No User" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({ msg: "No Password" });
    }

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: "Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ msg: "no User" });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: "Error" });
  }
};
