const router = require('express').Router();
const { createCustomer, readCustomerById, editCustomerById, deleteCustomerById, createAddress, readAddressById, editAddressById, deleteAddressById, addCustomerAddress, createPhone, readPhoneById, editPhoneById, deletePhoneById, addCustomerPhone } = require('../data/db/customer');

router.post('/', (req, res) => {
  const { name, username, password } = req.body;
  createCustomer(name, username, password)
    .then((newCustomer) => {
      res.json({ newCustomer });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error creating customer' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  readCustomerById(id)
    .then((customer) => {
      res.json({ customer });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error finding customer' });
    });
});

router.put('/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, username, password } = req.body;
  console.log('req.body', req.body);
  editCustomerById(id, name, username, password)
    .then((edited) => {
      res.json({ edited });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error editing customer' });
    });
});


router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;
  deleteCustomerById(id)
    .then((deleted) => {
      res.json({ deleted });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: 'error deleting customer' });
    });
});

// to add a customer address, we need to first add the address to the address database, and then add the resulting address id along with the customer information to the customer_address table.
router.post('/:id/address', (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  createAddress(address)
    .then((added) => {
      console.log('added', added.id);
      addCustomerAddress(id, added.id)
        .then((custAddress) => {
          res.json({ custAddress });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error adding address" });
    });
});

router.get('/:id/address', (req, res) => {
  const { id } = req.params;

  readAddressById(id)
    .then((address) => {
      res.json({ address });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error reading address" });
    });
});

router.put('/:customerId/address/:addressId/edit', (req, res) => {
  const { addressId } = req.params;
  const { address } = req.body;

  editAddressById(addressId, address)
    .then((editedAddress) => {
      res.json({ editedAddress });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error editing address" });
    });
});

router.delete('/:customerId/address/:addressId/delete', (req, res) => {
  const { addressId } = req.params;

  deleteAddressById(addressId)
    .then((deleted) => {
      res.json({ deleted });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error deleting address" });
    });
});

router.post('/:id/phone', (req, res) => {
  const { id } = req.params;
  const { phone } = req.body;

  createPhone(phone)
    .then((added) => {
      addCustomerPhone(id, added.id)
        .then((custPhone) => {
          res.json({ custPhone });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error adding phone" });
    });
});

router.get('/:id/phone', (req, res) => {
  const { id } = req.params;

  readPhoneById(id)
    .then((phone) => {
      res.json({ phone });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error reading phone number" });
    });
});

router.put('/:customerId/phone/:phoneId/edit', (req, res) => {
  const { phoneId } = req.params;
  const { phone } = req.body;

  editPhoneById(phoneId, phone)
    .then((editedPhone) => {
      res.json({ editedPhone });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error editing phone number" });
    });
});

router.delete('/:customerId/phone/:phoneId/delete', (req, res) => {
  const { phoneId } = req.params;

  deletePhoneById(phoneId)
    .then((deleted) => {
      res.json({ deleted });
    })
    .catch((err) => {
      console.error(err);
      res.json({ msg: "error deleting phone number" });
    });
});

module.exports = router;
