const Todo = require('../models/todoModels')

exports.indexTodo = async (req, res) => {
    try {
        const foundTodos = await Todo.find({})
        res.send( {
            todos: foundTodos })

    } catch(error) {
        res.status(400).send({message: error.message})
    }
}

exports.deleteTodo = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id)
      res.json({ message: 'Todo deleted' })

    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}

 exports.updateTodo = async (req, res) => {
    try {
      const updates = Object.keys(req.body)
      const todo = await Todo.findById(req.params.id)
      updates.forEach(update => (todo[update] = req.body[update]))
      await todo.save()
      res.json(todo)

    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}

exports.createTodo = async (req, res) => {
    try {
      const todo = new Todo(req.body)
      await todo.save()
      res.status(201).json(todo)

    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}
  
  exports.idOfTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id)
      res.json(todo)

    } catch (error) {
      res.status(400).json({ message: error.message })
    }
}
  

  