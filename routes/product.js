const express = require("express")
const router = express.Router()
const { authentication } = require("../middleware/auth")

const coba = ""

const controller = require("../controllers/controllers")

router.get("/", controller.getAllProduct)
router.get("/:id", controller.getProductById)
router.post("/add", controller.addProduct)
router.put("/:id", controller.updateProduct)
// router.delete("/delete/:id", controller.deleteProduct)

module.exports = router
