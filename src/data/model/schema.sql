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
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer ON DELETE CASCADE,
  address_id INTEGER REFERENCES address ON DELETE CASCADE
);

CREATE TABLE phone_number (
  id SERIAL PRIMARY KEY,
  phone_number TEXT
);

CREATE TABLE customer_phone (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer ON DELETE CASCADE,
  phone_id INTEGER REFERENCES phone_number ON DELETE CASCADE
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
  card_id INTEGER REFERENCES credit_card ON DELETE CASCADE,
  type TEXT
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer ON DELETE CASCADE,
  payment_method_id INTEGER REFERENCES payment_method ON DELETE CASCADE,
  is_happy_hour BOOLEAN,
  is_delivery BOOLEAN,
  total_price MONEY
);

CREATE TABLE drink_cart (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart ON DELETE CASCADE,
  drink_id INTEGER REFERENCES drink ON DELETE CASCADE
);

CREATE TABLE pizza (
  id SERIAL PRIMARY KEY,
  size_id INTEGER REFERENCES size ON DELETE SET NULL,
  crust_id INTEGER REFERENCES crust ON DELETE SET NULL,
  cart_id INTEGER REFERENCES cart ON DELETE CASCADE,
  price MONEY
);

CREATE TABLE pizza_ingredient (
  id SERIAL PRIMARY KEY,
  pizza_id INTEGER REFERENCES pizza ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES ingredient ON DELETE SET NULL
);

CREATE TABLE preference (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customer ON DELETE CASCADE,
  pizza_id INTEGER REFERENCES pizza ON DELETE SET NULL
);

CREATE TABLE delivery (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart ON DELETE CASCADE,
  cart_time TIMESTAMP(6),
  address_id INTEGER REFERENCES address ON DELETE CASCADE,
  tip MONEY
);
