const { addCertification, getCertificationsByEmail } = require("../models/certificationModel");

const addCertificationController = async (req, res, next) => {
  try {
    const certification = await addCertification(req.body);
    res.json(certification);
  } catch (err) {
    next(err);
  }
};

const getCertificationsController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const certifications = await getCertificationsByEmail(email);
    res.json(certifications);
  } catch (err) {
    next(err);
  }
};

module.exports = { addCertificationController, getCertificationsController };