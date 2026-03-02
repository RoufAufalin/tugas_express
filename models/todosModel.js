const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TodoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isCompleted: Boolean,
    createdAt: String,
    priority: String,
  },
  { collection: "todos" },
)

const Todo = mongoose.model("Todos", TodoSchema)

const todosModel = {
  getAllTodos: async () => {
    try {
      const allTodos = await Todo.find({})
      console.log(allTodos)
      return allTodos
    } catch (err) {
      console.error("Terjadi kesalahan", err)
    }
  },
  getTodoById: async (id) => {
    try {
      const todo = await Todo.findById(id)
      console.log(todo)
      return todo
    } catch (err) {
      console.log(err)
    }
  },

  addProduct: async (newTodo) => {
    try {
      const sekarang = new Date()
      newTodo.createdAt = sekarang.toISOString()
      const savedTodo = await Todo.create(newTodo)
      console.log(savedTodo)

      return savedTodo
    } catch (err) {
      console.error("Gagal Menambah Data: ", err)
      throw err
    }
  },

  updateTodo: async (id, updatedData) => {
    console.log(updatedData)

    try {
      const sekarang = new Date()
      updatedData.createdAt = sekarang.toISOString()
      const result = await Todo.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidator: true,
      })

      if (!result) {
        console.log("Produk tidak ditemukan")
        return null
      }

      console.log("Data berhasil diupdate:", result)
      return result
    } catch (err) {
      console.error(err, "Ini eror")

      throw err
    }
  },

  deleteTodo: async (id) => {
    try {
      const todo = await Todo.findByIdAndDelete(id)

      if (!todo) {
        console.log("Data not found")
        return null
      } else {
        console.log("Data successfully deleted", todo)
        return todo
      }
    } catch (err) {
      console.log("Error: ", err)
      throw err
    }
  },
}

module.exports = todosModel
