# This sample data was used and tested by Renae Hunt

INSERT INTO users (username) VALUES
('Renae'),
('Victoria'),
('Nana'),
('Mason'),
('Logan');

INSERT INTO ingredients (name) VALUES
('chicken breast'),
('salt'),
('pepper'),
('olive oil'),
('garlic'),
('onion'),
('rice'),
('tomato'),
('cheese'),
('pasta');

INSERT INTO recipes (name, description, cook_time, prep_time, servings, instructions, rating, meal_type) VALUES
('Garlic Chicken', 'Simple garlic chicken dish', 25, 10, 2, 'Cook chicken with garlic and oil.', 5, "Dinner"),
('Tomato Pasta', 'Classic pasta with tomato sauce', 20, 10, 3, 'Boil pasta and add sauce.', 4, "Dinner"),
('Chicken Rice Bowl', 'Chicken served over rice', 30, 15, 2, 'Cook rice, add seasoned chicken.', 4, "Lunch");

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES
(1, 1, '2 pieces'), -- chicken
(1, 5, '3 cloves'), -- garlic
(1, 4, '2 tbsp'),   -- olive oil
(1, 2, '1 tsp'),    -- salt

(2, 10, '200g'),    -- pasta
(2, 8, '2 cups'),   -- tomato
(2, 9, '1 cup'),    -- cheese
(2, 2, '1 tsp'),    -- salt

(3, 1, '1 piece'),  -- chicken
(3, 7, '1 cup'),    -- rice
(3, 6, '1/2 cup'),  -- onion
(3, 3, '1 tsp');    -- pepper

INSERT INTO pantry (user_id, ingredient_id, quantity) VALUES
(1, 1, '2 pieces'),
(1, 2, '1 tsp'),
(1, 4, '1 tbsp'),

(1, 7, '2 cups'),
(1, 8, '3 tomatoes'),

(1, 10, '500g'),
(1, 9, '2 cups'),

(1, 1, '1 piece'),
(1, 5, '2 cloves'),

(1, 6, '1 onion'),
(1, 3, '1 tsp');