INSERT INTO customer (name, username, password) VALUES ('Emily', 'e@e.com', '123');
INSERT INTO customer (name, username, password) VALUES ('Oscar', 'o@o.com', '123');
INSERT INTO customer (name, username, password) VALUES ('Marla', 'm@m.com', '123');

INSERT INTO address (address) VALUES ('123 Main St');
INSERT INTO address (address) VALUES ('5 9th St');
INSERT INTO address (address) VALUES ('50 Broadway St');

INSERT INTO customer_address (customer_id, address_id) VALUES (1, 1);
INSERT INTO customer_address (customer_id, address_id) VALUES (2, 2);
INSERT INTO customer_address (customer_id, address_id) VALUES (3, 3);

INSERT INTO phone_number (phone_number) VALUES ('555-555-5555');
INSERT INTO phone_number (phone_number) VALUES ('666-666-6666');
INSERT INTO phone_number (phone_number) VALUES ('777-777-7777');

INSERT INTO customer_phone (customer_id, phone_id) VALUES (1, 1);
INSERT INTO customer_phone (customer_id, phone_id) VALUES (2, 2);
INSERT INTO customer_phone (customer_id, phone_id) VALUES (3, 3);

INSERT INTO size (type, price) VALUES ('small', 10);
INSERT INTO size (type, price) VALUES ('medium', 12);
INSERT INTO size (type, price) VALUES ('large', 14);

INSERT INTO crust (type) VALUES ('thin');
INSERT INTO crust (type) VALUES ('thick');

INSERT INTO ingredient (name, price) VALUES ('cheese', 0);
INSERT INTO ingredient (name, price) VALUES ('mushroom', .10);
INSERT INTO ingredient (name, price) VALUES ('olives', .10);
INSERT INTO ingredient (name, price) VALUES ('pineapple', .10);
INSERT INTO ingredient (name, price) VALUES ('spinach', .10);
INSERT INTO ingredient (name, price) VALUES ('garlic', .10);
INSERT INTO ingredient (name, price) VALUES ('artichoke', .10);
INSERT INTO ingredient (name, price) VALUES ('bell pepper', .10);
INSERT INTO ingredient (name, price) VALUES ('onion', .10);
INSERT INTO ingredient (name, price) VALUES ('pepperoni', .10);
INSERT INTO ingredient (name, price) VALUES ('sausage', .10);
INSERT INTO ingredient (name, price) VALUES ('chicken', .10);
INSERT INTO ingredient (name, price) VALUES ('anchovies', .10);

INSERT INTO pizza (size_id, crust_id, price) VALUES (1, 1, 10);
INSERT INTO pizza (size_id, crust_id, price) VALUES (3, 2, 14.30);
INSERT INTO pizza (size_id, crust_id, price) VALUES (2, 1, 12.60);

INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (1, 1);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (2, 2);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (2, 3);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (2, 4);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 2);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 3);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 4);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 5);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 6);
INSERT INTO pizza_ingredient (pizza_id, ingredient_id) VALUES (3, 7);

INSERT INTO preference (customer_id, pizza_id) VALUES (1, 1);
INSERT INTO preference (customer_id, pizza_id) VALUES (2, 2);
INSERT INTO preference (customer_id, pizza_id) VALUES (3, 3);

INSERT INTO drink (name, manufacturer, supplier, price) VALUES ('Pepsi', 'Pepsico', 'Bob', 10);
INSERT INTO drink (name, manufacturer, supplier, price) VALUES ('Sunkist', 'Snapple', 'Tracy', 10);
INSERT INTO drink (name, manufacturer, supplier, price) VALUES ('Honest Tea', 'CocaCola', 'Nature''s Own', 15);

INSERT INTO credit_card (card_number) VALUES ('1234123412341234');

INSERT INTO payment_method (card_id, type) VALUES (1, 'credit');
INSERT INTO payment_method (type) VALUES ('cash');
INSERT INTO payment_method (type) VALUES ('ether');

INSERT INTO cart (customer_id, payment_method_id, is_happy_hour, is_delivery) VALUES (1, 1, false, true);
INSERT INTO cart (customer_id, payment_method_id, is_happy_hour, is_delivery) VALUES (2, 2, true, false);
INSERT INTO cart (customer_id, payment_method_id, is_happy_hour, is_delivery) VALUES (3, 3, false, false);

INSERT INTO pizza_cart (cart_id, pizza_id) VALUES (1, 1);
INSERT INTO pizza_cart (cart_id, pizza_id) VALUES (2, 2);
INSERT INTO pizza_cart (cart_id, pizza_id) VALUES (3, 3);

INSERT INTO drink_cart (cart_id, drink_id) VALUES (1, 1);
INSERT INTO drink_cart (cart_id, drink_id) VALUES (2, 2);
INSERT INTO drink_cart (cart_id, drink_id) VALUES (3, 3);

INSERT INTO delivery (cart_id, address_id, tip) VALUES (1, 1, 2);
INSERT INTO delivery (cart_id, address_id, tip) VALUES (2, 2, 4);
INSERT INTO delivery (cart_id, address_id, tip) VALUES (3, 3, 6);