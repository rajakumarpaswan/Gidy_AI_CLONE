const pool = require("../config/db");

const addEducation = async (data) => {
  let { email, college, degree, field, location, startDate, endDate, current } = data;
  if (endDate === "") endDate = null;

  const result = await pool.query(
    `INSERT INTO education
     (email, college, degree, field_of_study, location, start_date, end_date, currently_studying)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [email, college, degree, field, location, startDate, endDate, current]
  );
  return result.rows[0];
};

const getEducationByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM education
     WHERE email=$1
     ORDER BY start_date DESC`,
    [email]
  );
  return result.rows;
};

module.exports = { addEducation, getEducationByEmail };