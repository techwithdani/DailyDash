const express = require("express");
const router = express.Router();
const protectRoute = require("../middlewares/protectRoute");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");

router.get("/profile", protectRoute, getUserProfile);
router.put("/update-profile", protectRoute, updateUserProfile);

module.exports = router;
