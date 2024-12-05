const express = require('express')
const router = express.Router()

const tasksController = require('../controller/tasks')
const { tasksValidation } = require('../middlewares/tasks')

router.get('/', tasksController.index)
router.get('/:id', tasksController.show)
router.put('/:id', tasksValidation, tasksController.update)
router.delete('/:id', tasksController.destroy)
router.post('/', tasksValidation, tasksController.store)

module.exports = router