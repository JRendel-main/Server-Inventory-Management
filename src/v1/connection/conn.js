const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grocery_management',
    waitForConnections: true, // optional, default: true
    connectionLimit: 10, // optional, default: 10
    queueLimit: 0 // optional, default: 0
});

module.exports = pool;
