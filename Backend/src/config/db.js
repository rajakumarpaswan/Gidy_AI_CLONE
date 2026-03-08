// db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool =new Pool({
  user: process.env.USER,         
  host:  process.env.HOST_NAME,          
  database:  process.env.DB_NAME,           
  password:  process.env.PASSWORD,   
  port:  process.env.DB_PORT,  
})



pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

module.exports = pool;