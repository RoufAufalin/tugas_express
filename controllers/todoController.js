const todoModel = require("../models/todosModel")

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos()
    return res.status(200).json(todos)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Gagal mengambil produk" })
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

const addTodo = async (req, res) => {
  const { task, isCompleted, priority } = req.body

  if (!task || !isCompleted || !priority) {
    new Error("All fields are required")
  }
  try {
    await todoModel.addProduct({ task, isCompleted, priority })
    res.status(200).json("Berhasil menambahkan")
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateTodo = async (req, res) => {
  const { task, isCompleted, priority } = req.body
  const data = {
    task,
    isCompleted,
    priority,
  }

  if (!task || !isCompleted || !priority) {
    new Error("All fields are required")
  }

  try {
    const updatedData = await todoModel.updateTodo(req.params.id, data)
    res.status(200).json(updatedData)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteTodo = async (req, res) => {
  const id = req.params.id
  try {
    const deletedTodo = await todoModel.deleteTodo(id)

    if (!deletedTodo) {
      res.status(200).json("Data berhasil dihapus")
    }
  } catch (err) {
    res.status(500).json(err, "error")
  }
}

module.exports = { getAllTodos, getTodoById, addTodo, updateTodo, deleteTodo }
