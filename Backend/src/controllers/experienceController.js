const { addExperience, getExperienceByEmail, deleteExperience } = require("../models/experienceModel");

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


/* ---------- DELETE CONTROLLER ---------- */

const deleteExperienceController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedExperience = await deleteExperience(id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({
      message: "Experience deleted successfully",
      data: deletedExperience,
    });
  } catch (err) {
    next(err);
  }
};

console.log(deleteExperience);

module.exports = { addExperienceController, getExperienceController,deleteExperienceController };