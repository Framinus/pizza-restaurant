const db = require('./db');

const createDelivery = (cartId, addressId, tip) => {
  return db.one(`INSERT INTO delivery (cart_id, address_id, tip)
    VALUES ($1, $2, $3)
    RETURNING *`, [cartId, addressId, tip]);
};

const readDeliveryById = (deliveryId) => {
  return db.one(`SELECT * FROM delivery WHERE id=$1`, deliveryId);
};

const readAllDeliveries = () => {
  return db.any(`SELECT * FROM delivery`);
};

const updateDeliveryById = (deliveryId, addressId, tip) => {
  return db.one(`UPDATE delivery SET address_id=$2, tip=$3
    WHERE id=$1`, [deliveryId, addressId, tip]);
};

const deleteDeliveryById = (deliveryId) => {
  return db.oneOrNone(`DELETE FROM delivery WHERE id=$1`);
};

module.exports = {
  createDelivery,
  readAllDeliveries,
  readDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
};
