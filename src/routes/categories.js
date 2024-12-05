const express = require('express')
const router = express.Router()

const categoriesController = require('../controller/categories')
const { categoriesValidation } = require('../middlewares/categories')

router.get('/', categoriesController.index)
router.get('/:id', categoriesController.show)
router.put('/:id', categoriesValidation, categoriesController.update)
router.delete('/:id', categoriesController.destroy)
router.post('/', categoriesValidation, categoriesController.store)

module.exports = router