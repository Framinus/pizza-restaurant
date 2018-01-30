const db = require('./db');

// drink queries

const createDrink = (name, manufacturer, supplier, price) => {
  return db.one(`INSERT INTO drink (name, manufacturer, supplier, price) VALUES ($1, $2, $3, $4)
  RETURNING *`, [name, manufacturer, supplier, price]);
};

const readAllDrinks = () => {
  return db.any(`SELECT * FROM drink`);
};

const readDrinkById = (drinkId) => {
  return db.one(`SELECT * FROM drink WHERE id=$1`, drinkId);
};

const updateDrinkById = (drinkId, name, manufacturer, supplier, price) => {
  return db.one(`UPDATE drink SET name=$1, manufacturer=$2, supplier=$3, price=$4 WHERE id=$5`, [name, manufacturer, supplier, price, drinkId]);
};

const deleteDrinkById = (drinkId) => {
  return db.oneOrNone(`DELETE FROM drink WHERE id=$1`, drinkId);
};

module.exports = {
  createDrink,
  readAllDrinks,
  readDrinkById,
  updateDrinkById,
  deleteDrinkById,
};
