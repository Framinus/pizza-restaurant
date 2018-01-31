const router = require('express').Router();
const bcrypt = require('bcrypt');
const {
  createCreditCard,
  readCreditCardByCustomerId,
  deleteCreditCard,
  createPaymentMethod,
  readPaymentMethodById,
  readAllPaymentMethods,
  updatePaymentMethodById,
  deletePaymentMethodById,
  createCart,
  createDrinkCart,
  readCartById,
  updateCartById,
  deleteCartById,
  readDrinkCartById,
  deleteDrinkCartById,
} = require('../data/db/cart');

// create a credit card. JSON will not return the card number for security purposes - just a success message.
router.post('/creditcard/create', (req, res) => {
  const { cardNumber } = req.body;
  const saltRounds = 10;
  bcrypt.hash(cardNumber, saltRounds)
    .then((hashedNum) => {
      createCreditCard(hashedNum)
        .then((card) => {
          res.json({ msg: 'card successfully added' });
        })
        .catch((err) => {
          console.error(err);
          res.json({ msg: 'error adding credit card' });
        });
    });
});

// will need to refactor this once I learn more about decryption best practices.
router.get('/creditcard/:customerId', (req, res) => {
  const { customerId } = req.params;
  readCreditCardByCustomerId(customerId)
    .then((card) => {
      res.json({ msg: '' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error retrieving credit card' });
    });
});

// get a cart by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  readCartById(id)
    .then((cartData) => {
      res.json({ cartData });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'Error finding cart' });
    });
});


module.exports = router;
