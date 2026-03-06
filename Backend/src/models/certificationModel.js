const pool = require("../config/db");

const addCertification = async (data) => {
  let { email, certification, provider, url, certificateId, issuedDate, expiryDate, description } = data;
  if (issuedDate === "") issuedDate = null;
  if (expiryDate === "") expiryDate = null;

  const result = await pool.query(
    `INSERT INTO certifications
     (email, certification_name, provider, certificate_url, certificate_id, issued_date, expiry_date, description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [email, certification, provider, url, certificateId, issuedDate, expiryDate, description]
  );
  return result.rows[0];
};

const getCertificationsByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM certifications
     WHERE email=$1
     ORDER BY issued_date DESC`,
    [email]
  );
  return result.rows;
};

module.exports = { addCertification, getCertificationsByEmail };