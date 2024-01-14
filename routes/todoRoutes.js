const express = require('express')
const router = express.Router()
const todoControllers = require('../controllers/todoControllers')

router.get('/', todoControllers.indexTodo) //index
router.delete('/:id', todoControllers.deleteTodo) //delete
router.put('/:id', todoControllers.updateTodo) //update
router.post('/', todoControllers.createTodo) //create
router.get('/:id', todoControllers.idOfTodo) //show

module.exports = router