/* eslint-disable */
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
  RETURNING *`, [id, name, username, password]);
};

const deleteCustomerById = (id) => {
  return db.oneOrNone(`DELETE FROM customer
    WHERE id=$1`, id);
};

// address queries

const createAddress = (address) => {
  return db.one(`
    INSERT INTO address (address)
    VALUES ($1)
    RETURNING *`, address);
};

const readAddressById = (id) => {
  return db.one(`SELECT * FROM address
    WHERE id=$1`, id);
}

const editAddressById = (id, address) => {
  return db.one(`UPDATE address SET address=$2
    WHERE id=$1
    RETURNING *`, [id, address]);
};

const deleteAddressById = (id) => {
  return db.oneOrNone(`DELETE FROM address
    WHERE id=$1`, id);
};

const addCustomerAddress = (custId, addressId) => {
  return db.one(`INSERT INTO customer_address (customer_id, address_id) VALUES ($1, $2) RETURNING *`, [custId, addressId]);
}

// phone queries

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

const addCustomerPhone = (customerId, phoneId) => {
  return db.one(`INSERT INTO customer_phone (customer_id, phone_id) VALUES ($1, $2)
    RETURNING *`, [customerId, phoneId])
}

module.exports = {
  createCustomer,
  readCustomerById,
  editCustomerById,
  deleteCustomerById,
  createAddress,
  readAddressById,
  editAddressById,
  deleteAddressById,
  addCustomerAddress,
  createPhone,
  readPhoneById,
  editPhoneById,
  deletePhoneById,
  addCustomerPhone,
};
