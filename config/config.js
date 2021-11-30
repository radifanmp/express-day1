const mysql = require("mysql2");

// Setup Connection
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: null,
  database: "e-coomerce",
});

module.exports = connectionPool;
