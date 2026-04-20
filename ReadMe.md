# ReciMe

## How To Set Up After Cloning Repo! 

### How Can We Set Up the database?

**Tools I Used**
- MySQL Community Workbench
- Installed MySQL
- Windows 11 
- Java
- node.js

### Initialize the Application
In the directory in your terminal: `npm init -y`

After `npm install mysql2`

### Setting up the Database
I am sure there is a better way to do this, but using either the table_schema.sql or the export_file.sql (if present): either use the terminal or the MySQL Community Workbench and create the schema, `create schema recime`, and then create a user to give access to:
```CREATE USER 'recime'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
GRANT ALL PRIVILEGES ON recime.* TO 'recime'@'localhost';
FLUSH PRIVILEGES;
```

You can ensure things are set up properly by running the server.js file: `node server.js`. If you are able to connect to the server, than you should see all the recipes inside of the schema as of right now. 

## Database We Used: 
**MySQL**


### How Can We Share the Database?
With mysqldump!
```mysqldump -u [USERNAME] -p recime > export_file.sql ```

### Explaining the Schemda

#### Recipes
This is straightforward; this is what the users will submit with all the fun things
```CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cook_time INT, -- minutes
    prep_time INT, -- minutes
    servings INT,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Ingredient Table

```CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
```

#### Recipe Ingredients
```CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    quantity VARCHAR(50), 
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);
```

#### Users 
I know we talked about having a user for the application. 
```CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
);
```

#### Pantry
This will be for the pantry aspect of the application. 
```CREATE TABLE pantry (
    pantry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    ingredient_id INT,
    quantity VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);
```

