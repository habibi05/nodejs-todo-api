const express = require('express')
const router = express.Router()

const usersController = require('../controller/users')
const { usersValidation } = require('../middlewares/users')

router.get('/', usersController.index)
router.get('/:id', usersController.show)
router.put('/:id', usersValidation, usersController.update)
router.delete('/:id', usersController.destroy)
router.post('/', usersValidation, usersController.store)

module.exports = router