const express = require("express");
const router = express.Router();
const { addCertificationController, getCertificationsController } = require("../controllers/certificationController");

router.post("/add", addCertificationController);
router.get("/", getCertificationsController);

module.exports = router;