const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, "Theeban", { expiresIn: "10d" });
};

module.exports = generateToken;
