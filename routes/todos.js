const express = require("express")
const router = express.Router()

const controller = require("../controllers/todoController")

router.get("/", controller.getAllTodos)
router.get("/:id", controller.getTodoById)
router.post("/add", controller.addTodo)
router.put("/:id", controller.updateTodo)
router.delete("/delete/:id", controller.deleteTodo)

module.exports = router
