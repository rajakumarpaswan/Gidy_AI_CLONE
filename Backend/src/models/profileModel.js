// src/models/profileModel.js
const pool = require("../config/db");

const getProfileByEmail = async (name, email) => {
  const result = await pool.query(
    `SELECT name, education, location, bio, email, profile_pic
     FROM profile
     WHERE name = $1 AND email = $2`,
    [name, email]
  );
  return result.rows[0];
};

const updateProfile = async (profile) => {
  const { name, education, location, bio, profilePicUrl, email } = profile;
  const result = await pool.query(
    `UPDATE profile 
     SET name=$1, education=$2, location=$3, bio=$4, profile_pic=COALESCE($5, profile_pic)
     WHERE email=$6 RETURNING *`,
    [name, education, location, bio, profilePicUrl, email]
  );
  return result.rows[0];
};

module.exports = { getProfileByEmail, updateProfile };