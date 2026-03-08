const express = require("express");
const router = express.Router();
const { addExperienceController, getExperienceController,deleteExperienceController } = require("../controllers/experienceController");

router.post("/add-experience", addExperienceController);
router.get("/", getExperienceController);

router.delete("/delete-experience/:id", deleteExperienceController);



module.exports = router;