// db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool =new Pool({
     user:USER,         
  host: HOST_NAME,          
  database: DB_NAME,           
  password: PASSWORD,   
  port: PORT,  
})



pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

module.exports = pool;