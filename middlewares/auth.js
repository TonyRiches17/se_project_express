const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { NOT_AUTHORIZED } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(NOT_AUTHORIZED)
      .send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(NOT_AUTHORIZED)
      .send({ message: "Authorization required" });
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
