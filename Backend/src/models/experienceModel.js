const pool = require("../config/db");

const addExperience = async (data) => {
  const { email, designation, company, location, startDate, endDate } = data;
  const result = await pool.query(
    `INSERT INTO experience 
     (email, designation, company_name, location, start_date, end_date)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [email, designation, company, location, startDate, endDate]
  );
  return result.rows[0];
};

const getExperienceByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM experience
     WHERE email = $1
     ORDER BY start_date DESC`,
    [email]
  );
  return result.rows;
};

module.exports = { addExperience, getExperienceByEmail };