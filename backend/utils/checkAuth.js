import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  console.log(req.headers);
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({ msg: "Acees denied1" });
    }
  } else {
    return res.status(403).json({ msg: "Acees denied2" });
  }
};
