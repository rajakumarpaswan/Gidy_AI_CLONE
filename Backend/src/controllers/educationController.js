const { addEducation, getEducationByEmail } = require("../models/educationModel");

const addEducationController = async (req, res, next) => {
  try {
    const education = await addEducation(req.body);
    res.json(education);
  } catch (err) {
    next(err);
  }
};

const getEducationController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const educations = await getEducationByEmail(email);
    res.json(educations);
  } catch (err) {
    next(err);
  }
};

module.exports = { addEducationController, getEducationController };