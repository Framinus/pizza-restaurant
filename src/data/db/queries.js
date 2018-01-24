const db = require('./db');

// customer queries

const createCustomer = (name, username, password) => {
  return db.one(`
    INSERT INTO customer (name, username, password)
    VALUES ($1, $2, $3)
    RETURNING *`, [name, username, password])
};

const readCustomerById = (id) => {
  return db.one(`SELECT * FROM customer
    WHERE id=$1`, id);
};

const editCustomerById = (id, name, username, password) => {
  return db.one(`UPDATE customer SET name=$2, username=$3, password=$4 WHERE id=$1
  RETURNING *`, [name, username, password]);
};

const deleteCustomerById = (id) => {
  return db.oneOrNone(`DELETE FROM customer
    WHERE id=$1`, id);
};

//  queries

const createAddress = (address) => {
  return db.one(`
    INSERT INTO address (address)
    VALUES ($1)
    RETURNING *`, );
};

const readAddressById = (id) => {
  return db.one(`SELECT * FROM address
    WHERE id=$1`, id);
}

const editAddressById = (id, address) => {
  return db.one(`UPDATE address SET =$2
    WHERE id=$1
    RETURNING *`, [id, ]);
};

const deleteAddressById = (id) => {
  return db.oneOrNone(`DELETE FROM address
    WHERE id=$1`, id);
};

// phone

const createPhone = (phone) => {
  return db.one(`
    INSERT INTO phone_number (phone_number)
    VALUES ($1)
    RETURNING *`, phone);
};

const readPhoneById = (id) => {
  return db.one(`SELECT * FROM phone_number
    WHERE id=$1`, id);
}

const editPhoneById = (id, phone) => {
  return db.one(`UPDATE phone_number SET phone_number=$2
    WHERE id=$1
    RETURNING *`, [id, phone]);
};

const deletePhoneById = (id) => {
  return db.oneOrNone(`DELETE FROM phone_number
    WHERE id=$1`, id);
};

// size queries

const createSize = (type, price) => {
  return db.one(`INSERT INTO size (type, price)
  VALUES ($1, $2)
  RETURNING *`, [type, price])
};

const readAllSizes = () => {
  return db.any(`SELECT * FROM size`)
};

const readSizeById = (id) => {
  return db.one(`SELECT * FROM size
    WHERE id=$1`, id);
};

const updateSizeById = (id, type, price) => {
  return db.one(`UPDATE size SET type=$2, price=$3
    WHERE id=$1`, [id, type, price])
};

const deleteSizeById = (id) => {
  return db.oneOrNone(`DELETE FROM size WHERE id=$1`, id)
};

// crust queries

const createCrust = (type) => {
  return db.one(`INSERT INTO crust (type)
  VALUES ($1)
  RETURNING *`, [type])
};

const readAllCrusts = () => {
  return db.any(`SELECT * FROM crust`)
};

const readCrustById = (id) => {
  return db.one(`SELECT * FROM crust
    WHERE id=$1`, id);
};

const updateCrustById = (id, type) => {
  return db.one(`UPDATE crust SET type=$2
    WHERE id=$1`, [id, type])
};

const deleteCrustById = (id) => {
  return db.oneOrNone(`DELETE FROM crust WHERE id=$1`, id)
};


// ingredient queries

const createIngredient = (name, price) => {
  return db.one(`INSERT INTO ingredient (name, price)
  VALUES ($1, $2)
  RETURNING *`, [name, price])
};

const readAllIngredients = () => {
  return db.any(`SELECT * FROM ingredient`)
};

const readIngredientById = (id) => {
  return db.one(`SELECT * FROM ingredient
    WHERE id=$1`, id);
};

const updateIngredientById = (id, name, price) => {
  return db.one(`UPDATE ingredient SET name=$2, price=$3
    WHERE id=$1`, [id, name, price])
};

const deleteIngredientById = (id) => {
  return db.oneOrNone(`DELETE FROM ingredient WHERE id=$1`, id)
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

const createPizza = (sizeId, crustId, price) => {
  return db.one(`INSERT INTO pizza (size_id, crust_id, price)
  VALUES ($1, $2, $3)`, [sizeId, crustId, price]);
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
  return db.one(`INSERT INTO pizza_ingredient (ingredient_id)
    VALUES ($1)
    WHERE pizza_id=$2
    RETURNING *`, [ingredient, pizzaId])
}

const readPizzaIngredientsById = (pizzaId) => {
  return db.any(`SELECT * FROM pizza_ingredient
    WHERE pizza_id=$1`, [pizzaId])
}

const deletePizzaIngredientById = (pizzaId, ingredientId) => {
  return db.oneOrNone(`DELETE FROM pizza_ingredient
    WHERE pizza_id=$1 AND ingredient_id=$2 `, [pizzaId, ingredientId])
}

const createPreference = (customerId, pizzaId) => {
  return db.one(`INSERT INTO preference (pizza_id, ingredient_id)
    VALUES ($1, $2)
    RETURNING *`, [customerId, pizzaId])
}

const readTypeAndCrustPreferences = (customerId) => {
  return db.any(`SELECT size.type, crust.type
    FROM preference
    JOIN pizza ON preference.pizza_id = pizza.id
    JOIN size ON pizza.size_id = size.id
    JOIN crust ON pizza.crust_id = crust.id
    WHERE preference.customer_id=$1
    ORDER BY pizza.id`, customerId)
}

const readIngredientPreferences = (customerId) => {
  return db.any(`SELECT ingredient.name
    FROM preference
    JOIN pizza ON preference.pizza_id = pizza.id
    JOIN pizza_ingredient ON pizza.id = pizza_ingredient.pizza_id
    JOIN ingredient ON ingredient.id = pizza_ingredient.ingredient_id
    WHERE preference.customer_id=$1`, customerId)
}

// we need to discuss how we are going to handle the update preference functionality.

const deletePreference = (customerId, pizzaId) => {
  return db.oneOrNone(`DELETE FROM preference
    WHERE customer_id=$1 AND pizza_id=$2`, [customerId, pizzaId])
}

// drink queries

const createDrink = (name, manufacturer, supplier, price) => {
  return db.one(`INSERT INTO drink (name, manufacturer, supplier, price) VALUES ($1, $2, $3, $4)
  RETURNING *`, [name, manufacturer, supplier, price])
}

const readAllDrinks = () => {
  return db.any(`SELECT * FROM drink`)
}

const readDrinkById = (drinkId) => {
  return db.one(`SELECT * FROM drink WHERE id=$1`, drinkId)
}

const updateDrinkById = (drinkId, name, manufacturer, supplier, price) => {
  return db.one(`UPDATE drink SET name=$1, manufacturer=$2, supplier=$3, price=$4 WHERE id=$5`, [name, manufacturer, supplier, price, drinkId])
}

const deleteDrinkById = (drinkId) => {
  return db.oneOrNone(`DELETE FROM drink WHERE id=$1`, drinkId)
}

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

const createPizzaCart = (cartId, pizzaId) => {
  return db.one(`INSERT INTO pizza_cart (cart_id, pizza_id) VALUES ($1, $2)
  RETURNING *`, [cartId, pizzaId])
}

const createDrinkCart = (cartId, drinkId) => {
  return db.one(`INSERT INTO drink_cart (cart_id, drink_id) VALUES ($1, $2)
  RETURNING *`, [cartId, drinkId])
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

// Modify getSizePrice
// Call above two functions, add results in JavaScript and insert results into createPizza

module.exports = { createCustomer, readCustomerById, editCustomerById, deleteCustomerById, createAddress, readAddressById, editAddressById, deleteAddressById, createPhone, readPhoneById, editPhoneById, deletePhoneById, createSize, readAllSizes, readSizeById, updateSizeById, deleteSizeById, createCrust, readAllCrusts, readCrustById, updateCrustById, deleteCrustById, createIngredient, readAllIngredients, readIngredientById, updateIngredientById, deleteIngredientById, getPizzaIngredientPrice, getSizePrice, createPizza, readPizzaById, updatePizzaById, deletePizzaById, createPizzaIngredients, readPizzaIngredientsById, deletePizzaIngredientById, createPreference, readTypeAndCrustPreferences, readIngredientPreferences, deletePreference, createDrink, readAllDrinks, readDrinkById, updateDrinkById, deleteDrinkById, createCreditCard, readCreditCardByCustomerId, deleteCreditCard, createPaymentMethod, readPaymentMethodById, readAllPaymentMethods, updatePaymentMethodById, deletePaymentMethodById, createCart, createPizzaCart, createDrinkCart, readCartById, updateCartById, deleteCartById };
