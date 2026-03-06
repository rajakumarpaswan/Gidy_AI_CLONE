const express = require("express");
const router = express.Router();
const { addExperienceController, getExperienceController } = require("../controllers/experienceController");

router.post("/add-experience", addExperienceController);
router.get("/", getExperienceController);

module.exports = router;