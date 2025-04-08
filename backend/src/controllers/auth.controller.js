const asyncHandler = require("express-async-handler");
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
