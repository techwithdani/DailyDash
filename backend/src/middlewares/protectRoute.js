const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const protectRoute = asyncHandler(async (req, res, next) => {
  let jwtToken;

  jwtToken = req.cookies.jwt;

  if (jwtToken) {
    try {
      const verifyUser = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = await User.findById(verifyUser.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized. Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized. No Token");
  }
});

module.exports = protectRoute;
