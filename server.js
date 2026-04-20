// Renae Hunt
// Project: ReciMe
// Purpose is to create a connection to the MySQL Database. 
// Resources used from Geeks for Geeks: https://www.geeksforgeeks.org/node-js/node-js-connect-mysql-with-node-app/

// importing mysql module
const mysql = require('mysql2');

// creating connection to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'recime',
    user: 'root',
    password: 'root'
});

db.connect(function(err) {
    if (err) {
        console.log("Error connecting to the ReciMe database", err);
    } else {
        console.log("Connection created successfully to the ReciMe database");
    }
});

  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Query results:', results);
  });

