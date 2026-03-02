const todoModel = require("../models/todosModel")
const createError = require("http-errors")

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoModel.getAllTodos()
    return res.status(200).json(todos)
  } catch (err) {
    return next(err)
  }
}

const getTodoById = async (req, res) => {
  try {
    const todo = await todoModel.getTodoById(req.params.id)
    return res.status(200).json(todo)
  } catch (err) {
    return res.status(500).json({ error: "Gagal mengambil todo by id" })
  }
}

const addTodo = async (req, res, next) => {
  const { task, isCompleted, priority } = req.body
  const data = { task, isCompleted, priority }

  // validate required fields; allow false for isCompleted
  if (!task || typeof isCompleted === "undefined" || !priority) {
    return next(createError(400, "All fields are required"))
  }

  try {
    const createdTodo = await todoModel.addProduct(data)
    return res
      .status(201)
      .json({ message: "Berhasil menambahkan", todo: createdTodo })
  } catch (err) {
    return next(err)
  }
}

const updateTodo = async (req, res, next) => {
  const { task, isCompleted, priority } = req.body
  const data = {
    task,
    isCompleted,
    priority,
  }

  if (!task || !isCompleted || !priority) {
    return next(createError(400, "All fields are required"))
  }

  try {
    const updatedData = await todoModel.updateTodo(req.params.id, data)

    if (!updatedData) {
      // model returns null/undefined when not found
      return next(createError(400, "All fields are required"))
      return next()
    }

    return res
      .status(200)
      .json({ message: "Berhasil mengupdate", todo: updatedData })
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteTodo = async (req, res) => {
  const id = req.params.id
  try {
    const deletedTodo = await todoModel.deleteTodo(id)

    if (!deletedTodo) {
      console.log(deleteTodo)
      return res.status(404).json({ error: "Todo tidak ditemukan" })
    }

    return res
      .status(200)
      .json({ message: "Data berhasil dihapus", todo: deletedTodo })
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Gagal menghapus todo", details: err.message || err })
  }
}

module.exports = { getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo }
