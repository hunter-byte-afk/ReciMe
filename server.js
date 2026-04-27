// Renae Hunt
// Project: ReciMe
// Purpose is to create a connection to the MySQL Database. 
// Resources used from Geeks for Geeks: https://www.geeksforgeeks.org/node-js/node-js-connect-mysql-with-node-app/

// Mason Eiland
// Adding some server backend stuff (express) localhost:3000/recipes for now

const express = require('express');
const cors = require('cors');

// importing mysql module
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());

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


  // test route same thing as the db.query above just done on the server side
  // Retrieves all recipes
  app.get('/recipes', (req, res) => {
    db.query('SELECT * FROM recipes', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
  });

  // add a recipe to database
  app.post('/recipes', (req, res) => {
    const {
        name,
        desciption,
        cook_time,
        prep_time,
        servings,
        instructions
    } = req.body;

    const sql = `
        INSERT INTO recipes
        (name, description, cook_time, prep_time, servings, instructions)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name, 
            desciption, 
            parseInt(cook_time) || 0, 
            parseInt(prep_time) || 0, 
            parseInt(servings) || 0, 
            instructions
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Recipe added successfully!",
                recipeId: result.insertId
            });
        }
    );
  });

//   Retrieves the recipes based on search parameters { rating, mealType, name } for now...
  app.get('/recipes/search', (req, res) => {
    const { rating, mealType, name } = req.query;

    let sql = "SELECT * FROM recipes WHERE 1=1";
    let params = [];

    if (rating) {
        sql += " AND rating = ?";
        params.push(rating);
    }

    if (name) {
        sql += " AND name LIKE ?";
        params.push(`%${name}%`);
    }

    if (mealType) {
        sql += " AND meal_type = ?";
        params.push(mealType);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
  });

  //start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })