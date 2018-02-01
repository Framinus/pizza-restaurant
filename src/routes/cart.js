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
      return createCreditCard(hashedNum)
        .then((card) => {
          res.json({ msg: 'card successfully added' });
        })
        .catch((err) => {
          console.error(err);
          res.json({ msg: 'error adding credit card', err });
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
      res.json({ msg: 'error retrieving credit card', err });
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
      res.json({ msg: 'error deleting card. please check the id and try again.', err });
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
      res.json({ msg: 'an error occured while creating new payment method', err });
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
      res.json({ msg: 'error retrieving payment method', err });
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
      res.json({ msg: 'error retrieving all payment methods', err });
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
      res.json({ msg: 'error updating payment method!', err });
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
      res.json({ msg: 'error successfully deleting card', err });
    });
});

// cart queries

// create a new cart
// this function requires some discussion as to where the inputs are coming from. are customers logged in before they can place an order? if so, are we saving their ids as session variables to pass into the subsequent order pages? would the payment id also be saved this way?
router.post('/create', (req, res) => {
  const { customerId, paymentId, isHappyHour, isDelivery } = req.body;
  return createCart(customerId, paymentId, isHappyHour, isDelivery)
    .then((newCart) => {
      res.json({ newCart });
    })
    .catch((err) => {
      res.json({ msg: 'error creating cart', err });
    });
});

// get a cart by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  return readCartById(id)
    .then((cartData) => {
      res.json({ cartData });
    })
    .catch((err) => {
      res.json({ msg: 'Error finding cart', err });
    });
});

// updates the cart by id.
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { paymentId, isDelivery } = req.body;
  return updateCartById(id, paymentId, isDelivery)
    .then((updatedCart) => {
      res.json({ updatedCart });
    })
    .catch((err) => {
      res.json({ msg: 'Error updating cart', err });
    });
});

// deletes the cart by id
router.delete('/:id', (req, res) => {
  const { id } = req.body;
  return deleteCartById(id)
    .then((deleted) => {
      res.json({ msg: 'The cart has been successfully deleted', deleted });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'Error deleting cart', err });
    });
});

// drink cart queries

// create a drink cart entry with a cart id and a drink id.
router.post('/drink/create', (req, res) => {
  const { cartId, drinkId } = req.body;
  return createDrinkCart(cartId, drinkId)
    .then((newDrink) => {
      res.json({ newDrink });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error creating drink cart', err });
    });
});

// get all drinks in the cart by cart id.
router.get('/drink/:id', (req, res) => {
  const { id } = req.params;
  return readDrinkCartById(id)
    .then((drinkCart) => {
      res.json({ drinkCart });
    })
    .catch((err) => {
      res.json({ msg: 'error retrieving drink cart', err });
    });
});

router.delete('/drink/:id/delete', (req, res) => {
  const { id } = req.params;
  return deleteDrinkCartById(id)
    .then((deletedCart) => {
      res.json({ msg: 'drink cart has been successfully deleted', deletedCart });
    })
    .catch((err) => {
      res.json({ msg: 'error deleting drink cart', err });
    });
});


module.exports = router;
