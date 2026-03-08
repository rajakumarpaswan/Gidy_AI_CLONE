const express = require("express");
const router = express.Router();
const { addEducationController, getEducationController,deleteEducationController } = require("../controllers/educationController");

router.post("/add-education", addEducationController);
router.get("/", getEducationController);

router.delete("/delete-education/:id", deleteEducationController);

module.exports = router;