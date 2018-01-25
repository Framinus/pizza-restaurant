const router = require('express').Router();
const { createCustomer, readCustomerById, editCustomerById, deleteCustomerById } = require('../data/db/queries')

router.post('/', (req, res) => {
  const { name, username, password } = req.body
  createCustomer(name, username, password)
    .then((newCustomer) => {
      res.json({ newCustomer })
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error creating customer' })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  readCustomerById(id)
    .then((customer) => {
      res.json({customer})
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error finding customer' })
    })
})

router.put('/:id/edit', (req, res) => {
  const {id} = req.params
  const {name, username, password} = req.body
  console.log('req.body', req.body);
  editCustomerById(id, name, username, password)
    .then((edited) => {
      res.json({edited})
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error editing customer' })
    })
})

// this is problematic because deleting a customer violates foreign key restraints in about 50 other functions.
router.delete('/:id/delete', (req, res) => {
  const { id } = req.params
  deleteCustomerById(id)
    .then((deleted) => {
      res.json({deleted})
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error deleting customer' })
    })
})

module.exports = router;
