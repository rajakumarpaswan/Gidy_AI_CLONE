// src/controllers/profileController.js
const { getProfileByEmail, updateProfile } = require("../models/profileModel");

const getProfile = async (req, res, next) => {
  try {
    const { name, email } = req.query;
    const profile = await getProfileByEmail(name, email);
    if (!profile) return res.status(404).json({ message: "No data found" });
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const updateProfileController = async (req, res, next) => {
  try {
    const { name, education, location, bio, email } = req.body;
    let profilePicUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    const updatedProfile = await updateProfile({ name, education, location, bio, profilePicUrl, email });
    res.json({ message: "Profile updated successfully", user: updatedProfile });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfileController };