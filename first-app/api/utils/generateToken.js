const jwt = require("jsonwebtoken");
//Generate JWT
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
};

module.exports = { generateAccessToken }