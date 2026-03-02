const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource")
})

router.get("/:nama", function (req, res, next) {
  const nama = req.params.nama

  res.send(`Hello ${nama}`)
})

router.post("/registers", controller.register)

router.post("/login", controller.login)

module.exports = router
