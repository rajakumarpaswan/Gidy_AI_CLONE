// src/controllers/authController.js
const { getProfileByEmail } = require("../models/profileModel");

const login = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await getProfileByEmail(name, email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };