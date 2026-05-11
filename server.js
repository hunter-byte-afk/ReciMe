// Renae Hunt
// Project: ReciMe
// Purpose is to create a connection to the MySQL Database. 
// Resources used from Geeks for Geeks: https://www.geeksforgeeks.org/node-js/node-js-connect-mysql-with-node-app/

// Mason Eiland
// Adding some server backend stuff (express) localhost:3000/recipes for now
// Get Recipes, Add Recipes, Search Recipes logic

// Victoria Treviño
// Connecting a route to html on initial page load.

//Logan Bales
// Added backend routes for user database

const express = require('express');
const cors = require('cors');
const path = require('path');

// importing mysql module
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());

// static file to route to index.html
app.use(express.static('html'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});
app.use(express.static(path.join(__dirname), {index: false}));


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

  // ------- RECIPES -------
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
        description,
        cook_time,
        prep_time,
        servings,
        instructions,
        rating,
        meal_type,
        ingredients
    } = req.body;

    const sql = `
        INSERT INTO recipes
        (name, description, cook_time, prep_time, servings, instructions, rating, meal_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name, 
            description, 
            parseInt(cook_time) || 0, 
            parseInt(prep_time) || 0, 
            parseInt(servings) || 0, 
            instructions,
            parseInt(rating) || 0,
            meal_type

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
        sql += " AND rating >= ?";
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


// ------ INGREDIENTS -------

app.get('/ingredients', (req, res) => {
    db.query('SELECT * FROM ingredients', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

app.post('/ingredients', (req, res) => {
    const {name} = req.body;
    const sql = `
            INSERT INTO ingredients
            (name)
            VALUES (?)
        `;

    db.query(sql, [name], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        } 
        res.json({
            ingredient_id: results.insertId,
            name
        });
    });

});

app.delete('/ingredients/:id', (req, res) => {
    const {id} = req.params;

    const sql = `
        DELETE FROM ingredients
        WHERE ingredient_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "Ingredient deleted",
            affectedRows: results.affectedRows
        });
    });
});

// ----- USERS ------

  app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
  });

  app.get('/users/search', (req, res) => {
    const {user_id, username} = req.query;

    db.query('SELECT * FROM users WHERE username = "${username}"', (err, results) => {
        if(err){
            return res.status(500).json(err);
        }
        res.json(results);
    });
  });

  //used for login, other routes are not used.
  app.post('/users', (req,res) => {
    const {name} = req.body;

    //checking if user already in db
    db.query('SELECT * FROM users WHERE username = ?', [name], (err, results) => {
        if(err){
            return res.status(500).json(err);
        }
        
        console.log(results);
        if(results.length > 0){
            return res.json(results); //user already in db, don't insert to avoid error
        }

        //user not in db, add them
        db.query(
        'INSERT INTO users (username) VALUES (?)',[name],
        (err,result) => {
            if (err){
                return res.status(500).json(err);
            }
            res.json({
                message: "User added successfully." 
            });
            console.log(result);
        }
    );
    });

    
  });

  app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
  });

  //start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })