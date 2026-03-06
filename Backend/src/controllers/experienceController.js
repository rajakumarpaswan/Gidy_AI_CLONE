const { addExperience, getExperienceByEmail } = require("../models/experienceModel");

const addExperienceController = async (req, res, next) => {
  try {
    const experience = await addExperience(req.body);
    res.json({ message: "Experience added successfully", experience });
  } catch (err) {
    next(err);
  }
};

const getExperienceController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const experiences = await getExperienceByEmail(email);
    res.json(experiences);
  } catch (err) {
    next(err);
  }
};

module.exports = { addExperienceController, getExperienceController };