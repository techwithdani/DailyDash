const jwt = require("jsonwebtoken");

const generateJwtToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateJwtToken;
