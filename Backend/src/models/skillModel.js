const pool = require("../config/db");

const addSkill = async (email, skill) => {
  const result = await pool.query(
    `INSERT INTO skills (email, skill_name)
     VALUES ($1, $2) RETURNING *`,
    [email, skill]
  );
  return result.rows[0];
};

const getSkillsByEmail = async (email) => {
  const result = await pool.query(
    `SELECT skill_name FROM skills WHERE email = $1`,
    [email]
  );
  return result.rows;
};

module.exports = { addSkill, getSkillsByEmail };