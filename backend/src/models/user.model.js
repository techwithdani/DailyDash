const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    password: {
      type: String,
      required: [true, "Password required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    dateOfBirth: {
      type: Date,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
