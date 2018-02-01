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
  return readCreditCardByCustomerId(customerId)
    .then((card) => {
      res.json({ msg: '' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error retrieving credit card' });
    });
});

router.delete('/creditcard/:cardId/delete', (req, res) => {
  const { cardId } = req.params;
  return deleteCreditCard(cardId)
    .then((deleted) => {
      res.json({ msg: 'card has been successfully deleted' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error deleting card. please check the id and try again.' });
    });
});

// payment method queries.

// creating a new payment method.
router.post('/paymentmethod/create', (req, res) => {
  const { cardId, type } = req.body;
  return createPaymentMethod(cardId, type)
    .then((newPaymentMethod) => {
      res.json({ newPaymentMethod, msg: 'new payment method successfully created' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'an error occured while creating new payment method' });
    });
});

// reading a new payment method by id.
router.get('/paymentmethod/:id', (req, res) => {
  const { id } = req.params;
  return readPaymentMethodById(id)
    .then((paymentMethod) => {
      res.json({ paymentMethod });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error retrieving payment method' });
    });
});

// getting ALL payment methods
router.get('/paymentmethod', (req, res) => {
  return readAllPaymentMethods()
    .then((paymentMethods) => {
      res.json({ paymentMethods });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error retrieving all payment methods' });
    });
});

// updating a payment method by id
router.put('/paymentmethod/:id', (req, res) => {
  const { id } = req.params;
  const { cardId, type } = req.body;
  return updatePaymentMethodById(id, cardId, type)
    .then((updated) => {
      res.json({ updated });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error updating payment method!' });
    });
});

// deleting a payment method by id
router.delete('/paymentmethod/:id/delete', (req, res) => {
  const { id } = req.params;
  return deletePaymentMethodById(id)
    .then((deleted) => {
      res.json({ msg: 'payment method successfully deleted' });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error successfully deleting card' });
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
