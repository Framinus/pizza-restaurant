/* eslint-disable */
const db = require('./db');

// credit card queries

const createCreditCard = (cardNumber) => {
  return db.one(`INSERT INTO credit_card (card_number) VALUES ($1)
  RETURNING *`, cardNumber)
}

const readCreditCardByCustomerId = (customerId) => {
  return db.one(`SELECT credit_card.card_number
  FROM credit_card
  JOIN payment_method ON credit_card.id = payment_method.card_id
  JOIN cart ON payment_method.id = cart.payment_method_id
  WHERE cart.customer_id = $1`, customerId)
}

// const updateCreditCard = () => {
//
// }

const deleteCreditCard = (cardId) => {
  return db.oneOrNone(`DELETE FROM credit_card WHERE id=$1`, cardId)
}

// payment_method queries

const createPaymentMethod = (cardId, type) => {
  return db.one(`INSERT INTO payment_method (card_id, type) VALUES ($1, $2)
  RETURNING *`, [cardId, type])
}

const readPaymentMethodById = (paymentId) => {
  return db.one(`SELECT * FROM payment_method WHERE id=$1`, paymentId)
}

const readAllPaymentMethods = () => {
  return db.any(`SELECT * FROM payment_method`)
}

const updatePaymentMethodById = (paymentId, cardId, type) => {
  return db.one(`UPDATE payment_method SET card_id=$2, type=$3 WHERE id=$1
    RETURNING *`, [paymentId, cardId, type])
}

const deletePaymentMethodById = (paymentId) => {
  return db.oneOrNone(`DELETE FROM payment_method WHERE id=$1`, paymentId)
}

// cart queries

const createCart = (customerId, paymentId, isHappyHour, isDelivery) => {
  return db.one(`INSERT INTO cart (customer_id, payment_method_id, is_happy_hour, is_delivery) VALUES ($1, $2, $3, $4)
  RETURNING *`, [customerId, paymentId, isHappyHour, isDelivery])
}

const readCartById = (cartId) => {
  return db.one(`SELECT * FROM cart WHERE id=$1`, cartId)
}

const updateCartById = (cartId, paymentId, isDelivery) => {
  return db.one(`UPDATE cart SET payment_method_id=$2, is_delivery=$3 WHERE id=$1
  RETURNING *`, [cartId, paymentId, isDelivery])
}

const deleteCartById = (cartId) => {
  return db.oneOrNone(`DELETE FROM cart WHERE id=$1`, cartId)
}

const createPizzaCart = (cartId, pizzaId) => {
  return db.one(`INSERT INTO pizza_cart (cart_id, pizza_id) VALUES ($1, $2)
  RETURNING *`, [cartId, pizzaId])
}

const readPizzaCartById = (cartId) => {
  return db.one(`SELECT * FROM pizza_cart WHERE cart_id=$1`, cartId)
}

const deletePizzaCartById = (cartId) => {
  return db.oneOrNone(`DELETE FROM pizza_cart WHERE cart_id=$1`, cartId)
}

const createDrinkCart = (cartId, drinkId) => {
  return db.one(`INSERT INTO drink_cart (cart_id, drink_id) VALUES ($1, $2)
  RETURNING *`, [cartId, drinkId])
}

const readDrinkCartById = (cartId) => {
  return db.one(`SELECT * FROM drink_cart WHERE cart_id=$1`, cartId)
}

const deleteDrinkCartById = (cartId) => {
  return db.oneOrNone(`DELETE FROM drink_cart WHERE cart_id=$1`, cartId)
}

module.exports = {
  createCreditCard,
  readCreditCardByCustomerId,
  deleteCreditCard,
  createPaymentMethod,
  readPaymentMethodById,
  readAllPaymentMethods,
  updatePaymentMethodById,
  deletePaymentMethodById,
  createCart,
  createPizzaCart,
  createDrinkCart,
  readCartById,
  updateCartById,
  deleteCartById,
  readPizzaCartById,
  deletePizzaCartById,
  readDrinkCartById,
  deleteDrinkCartById,
};
