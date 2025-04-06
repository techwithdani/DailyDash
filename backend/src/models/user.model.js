const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [3, "Full name must be at least 3 characters long"],
    },
    userName: {
      type: String,
      required: [true, "User name required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth required"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
