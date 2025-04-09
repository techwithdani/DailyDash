const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      fullName: req.user._id,
      userName: req.user.userName,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
