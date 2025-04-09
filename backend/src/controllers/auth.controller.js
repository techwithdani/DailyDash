const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateJwtToken = require("../utils/generateJwtToken");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const newUser = await User.create({
    fullName,
    userName,
    email,
    password,
  });

  if (newUser) {
    generateJwtToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      email: newUser.email,
      message: "User Created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    if (await bcrypt.compare(password, userExists.password)) {
      generateJwtToken(res, userExists._id);

      res.status(200).json({
        _id: userExists._id,
        userName: userExists.userName,
        email: userExists.email,
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
