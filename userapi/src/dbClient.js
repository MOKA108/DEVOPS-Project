const mysql = require('mysql2')
const config = require('../conf/default.json')

// Database client for the user API service. 
// This module creates a MySQL connection pool to manage database connections efficiently.
// It uses the configuration defined in default.json to connect to the MySQL database.

const db = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = db
