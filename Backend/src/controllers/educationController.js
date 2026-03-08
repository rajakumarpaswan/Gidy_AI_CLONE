const { addEducation, getEducationByEmail, deleteEducation } = require("../models/educationModel");

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

const deleteEducationController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEducation = await deleteEducation(id);

    if (!deletedEducation) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json({
      message: "Education deleted successfully",
      data: deletedEducation,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addEducationController, getEducationController, deleteEducationController };