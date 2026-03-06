const express = require("express");
const router = express.Router();
const { addEducationController, getEducationController } = require("../controllers/educationController");

router.post("/add-education", addEducationController);
router.get("/", getEducationController);

module.exports = router;