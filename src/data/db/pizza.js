const db = require('./db');

// size queries

const createSize = (type, price) => {
  return db.one(`INSERT INTO size (type, price)
  VALUES ($1, $2)
  RETURNING *`, [type, price]);
};

const readAllSizes = () => {
  return db.any(`SELECT * FROM size`);
};

const readSizeById = (id) => {
  return db.one(`SELECT * FROM size
    WHERE id=$1`, id);
};

const updateSizeById = (id, type, price) => {
  return db.one(`UPDATE size SET type=$2, price=$3
    WHERE id=$1`, [id, type, price]);
};

const deleteSizeById = (id) => {
  return db.oneOrNone(`DELETE FROM size WHERE id=$1`, id);
};

// crust queries

const createCrust = (type) => {
  return db.one(`INSERT INTO crust (type)
  VALUES ($1)
  RETURNING *`, [type]);
};

const readAllCrusts = () => {
  return db.any(`SELECT * FROM crust`);
};

const readCrustById = (id) => {
  return db.one(`SELECT * FROM crust
    WHERE id=$1`, id);
};

const updateCrustById = (id, type) => {
  return db.one(`UPDATE crust SET type=$2
    WHERE id=$1`, [id, type]);
};

const deleteCrustById = (id) => {
  return db.oneOrNone(`DELETE FROM crust WHERE id=$1`, id);
};


// ingredient queries

const createIngredient = (name, price) => {
  return db.one(`INSERT INTO ingredient (name, price)
  VALUES ($1, $2)
  RETURNING *`, [name, price]);
};

const readAllIngredients = () => {
  return db.any(`SELECT * FROM ingredient`);
};

const readIngredientById = (id) => {
  return db.one(`SELECT * FROM ingredient
    WHERE id=$1`, id);
};

const updateIngredientById = (id, name, price) => {
  return db.one(`UPDATE ingredient SET name=$2, price=$3
    WHERE id=$1`, [id, name, price]);
};

const deleteIngredientById = (id) => {
  return db.oneOrNone(`DELETE FROM ingredient WHERE id=$1`, id);
};

// pizza queries

const getPizzaIngredientPrice = (pizzaId) => {
  return db.any(`SELECT SUM(ingredient.price)
    FROM ingredient
    JOIN pizza_ingredient on ingredient.id = pizza_ingredient.ingredient_id
    WHERE pizza_ingredient.pizza_id=$1`, pizzaId);
};

const getSizePrice = (pizzaId) => {
  return db.any(`SELECT size.price
    FROM size
    JOIN pizza on size.id = pizza.size_id
    WHERE pizza.id=$1`, pizzaId);
};

const createPizza = (sizeId, crustId, cartId) => {
  return db.one(`INSERT INTO pizza (size_id, crust_id, cart_id)
  VALUES ($1, $2, $3)
  RETURNING *`, [sizeId, crustId, cartId]);
};

const readPizzaById = (pizzaId) => {
  return db.one(`SELECT * FROM pizza WHERE id=$1`, pizzaId);
};

const updatePizzaById = (sizeId, crustId, price, pizzaId) => {
  return db.one(`UPDATE pizza SET size_id=$1, crust_id=$2, price=$3
    WHERE id=$4
    RETURNING *`, [sizeId, crustId, price, pizzaId]);
};

const deletePizzaById = (pizzaId) => {
  return db.oneOrNone(`DELETE FROM pizza WHERE id=$1`, pizzaId);
};

const createPizzaIngredients = (pizzaId, ingredient) => {
  return db.one(`INSERT INTO pizza_ingredient (pizza_id, ingredient_id)
    VALUES ($1, $2)
    RETURNING *`, [pizzaId, ingredient]);
};

const readPizzaIngredientsById = (pizzaId) => {
  return db.any(`SELECT * FROM pizza_ingredient
    WHERE pizza_id=$1`, [pizzaId]);
};

const deletePizzaIngredientById = (pizzaId, ingredientId) => {
  return db.oneOrNone(`DELETE FROM pizza_ingredient
    WHERE pizza_id=$1 AND ingredient_id=$2 `, [pizzaId, ingredientId]);
};

const createPreference = (customerId, pizzaId) => {
  return db.one(`INSERT INTO preference (pizza_id, ingredient_id)
    VALUES ($1, $2)
    RETURNING *`, [customerId, pizzaId]);
};

const readTypeAndCrustPreferences = (customerId) => {
  return db.any(`SELECT size.type, crust.type
    FROM preference
    JOIN pizza ON preference.pizza_id = pizza.id
    JOIN size ON pizza.size_id = size.id
    JOIN crust ON pizza.crust_id = crust.id
    WHERE preference.customer_id=$1
    ORDER BY pizza.id`, customerId);
};

const readIngredientPreferences = (customerId) => {
  return db.any(`SELECT ingredient.name
    FROM preference
    JOIN pizza ON preference.pizza_id = pizza.id
    JOIN pizza_ingredient ON pizza.id = pizza_ingredient.pizza_id
    JOIN ingredient ON ingredient.id = pizza_ingredient.ingredient_id
    WHERE preference.customer_id=$1`, customerId);
};

// we need to discuss how we are going to handle the update preference functionality.

const deletePreference = (customerId, pizzaId) => {
  return db.oneOrNone(`DELETE FROM preference
    WHERE customer_id=$1 AND pizza_id=$2`, [customerId, pizzaId]);
};

module.exports = {
  createSize,
  readAllSizes,
  readSizeById,
  updateSizeById,
  deleteSizeById,
  createCrust,
  readAllCrusts,
  readCrustById,
  updateCrustById,
  deleteCrustById,
  createIngredient,
  readAllIngredients,
  readIngredientById,
  updateIngredientById,
  deleteIngredientById,
  getPizzaIngredientPrice,
  getSizePrice,
  createPizza,
  readPizzaById,
  updatePizzaById,
  deletePizzaById,
  createPizzaIngredients,
  readPizzaIngredientsById,
  deletePizzaIngredientById,
  createPreference,
  readTypeAndCrustPreferences,
  readIngredientPreferences,
  deletePreference,
};
