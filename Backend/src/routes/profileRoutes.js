// src/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { getProfile, updateProfileController } = require("../controllers/profileController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getProfile);
router.put("/update-profile", upload.single("profilePic"), updateProfileController);

module.exports = router;