const express = require("express");
const router = express.Router();
const { addSkillController, getSkillsController } = require("../controllers/skillController");

router.post("/add", addSkillController);
router.get("/", getSkillsController);

module.exports = router;