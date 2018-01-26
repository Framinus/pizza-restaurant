const router = require('express').Router();

const { readAllSizes, readAllCrusts, readAllIngredients, getPizzaIngredientPrice, getSizePrice, createPizza, readPizza, deletePizzaById, createPizzaIngredients, readPizzaIngredientsById, deletePizzaIngredientById, createPreference, readTypeAndCrustPreferences, readIngredientPreferences, deletePreference} = require('../data/db/queries')

router.get('/sizes', (req, res) => {
  readAllSizes()
    .then((sizes) => {
      res.json({ sizes })
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error reading sizes' })
    })
})

router.get('/crusts', (req, res) => {
  readAllCrusts()
    .then((crusts) => {
      res.json({ crusts })
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error reading crusts' })
    })
})

router.get('/ingredients', (req, res) => {
  readAllIngredients()
    .then((ingredients) => {
      res.json({ ingredients })
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error reading ingredients' })
    })
})

router.post('/create', (req, res) => {
  const { sizeId, crustId } = req.body
  const price = null

  createPizza(sizeId, crustId, price)
    .then((pizza) => {
      res.json({ pizza })
    })
    .catch((err) => {
      console.error(err)
      res.json({ msg: 'error creating pizza' })
    })
})

const addIngredients = (req, res, next) => {
  const { pizzaId } = req.params
  const { ingredients } = req.body
  const ingredientArray = []

  ingredients.forEach((ingredient) => {
    createPizzaIngredients(pizzaId, ingredient)
      .then((newIngredient) => {
        ingredientArray.push(newIngredient)
      })
  })
  req.ingredientList = ingredientArray

}

router.post('/:pizzaId/ingredients', (req, res) => {
  res.json({ ingredientList })
})

module.exports = router