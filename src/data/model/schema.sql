CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  address TEXT NOT NULL
);

CREATE TABLE customer_address (
  customer_id INTEGER REFERENCES customer,
  address_id INTEGER REFERENCES address
);

CREATE TABLE phone_number (
  id SERIAL PRIMARY KEY,
  phone_number TEXT
);

CREATE TABLE customer_phone (
  customer_id INTEGER REFERENCES customer,
  phone_id INTEGER REFERENCES phone_number
);

CREATE TABLE size (
  id SERIAL PRIMARY KEY,
  type TEXT,
  price MONEY
);

CREATE TABLE crust (
  id SERIAL PRIMARY KEY,
  type TEXT
);

CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  name TEXT,
  price MONEY
);

CREATE TABLE pizza (
  id SERIAL PRIMARY KEY,
  size_id INTEGER REFERENCES size,
  crust_id INTEGER REFERENCES crust,
  price MONEY
);

CREATE TABLE pizza_ingredient (
  pizza_id INTEGER REFERENCES pizza,
  ingredient_id INTEGER REFERENCES ingredient
);

CREATE TABLE preference (
  customer_id INTEGER REFERENCES customer,
  pizza_id INTEGER REFERENCES pizza
);

CREATE TABLE drink (
  id SERIAL PRIMARY KEY,
  name TEXT,
  manufacturer TEXT,
  supplier TEXT,
  price MONEY
);

CREATE TABLE credit_card (
  id SERIAL PRIMARY KEY,
  card_number TEXT NOT NULL
);

CREATE TABLE payment_method (
  id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES credit_card,
  type TEXT
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer,
  payment_method_id INTEGER REFERENCES payment_method,
  is_happy_hour BOOLEAN,
  is_delivery BOOLEAN
);

CREATE TABLE pizza_cart (
  cart_id INTEGER REFERENCES cart,
  pizza_id INTEGER REFERENCES pizza
);

CREATE TABLE drink_cart (
  cart_id INTEGER REFERENCES cart,
  drink_id INTEGER REFERENCES drink
);

CREATE TABLE delivery (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart,
  cart_time TIMESTAMP(6),
  address_id INTEGER REFERENCES address,
  tip MONEY
);