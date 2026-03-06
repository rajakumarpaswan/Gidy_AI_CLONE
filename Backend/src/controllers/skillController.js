const { addSkill, getSkillsByEmail } = require("../models/skillModel");

const addSkillController = async (req, res, next) => {
  try {
    const { email, skill } = req.body;
    const skillData = await addSkill(email, skill);
    res.json(skillData);
  } catch (err) {
    next(err);
  }
};

const getSkillsController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const skills = await getSkillsByEmail(email);
    res.json(skills);
  } catch (err) {
    next(err);
  }
};

module.exports = { addSkillController, getSkillsController };