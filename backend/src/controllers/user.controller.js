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

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      userName: updatedUser.userName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
