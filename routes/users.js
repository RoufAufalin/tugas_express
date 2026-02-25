var express = require("express")
var router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource")
})

router.get("/:nama", function (req, res, next) {
  const nama = req.params.nama

  res.send(`Hello ${nama}`)
})

router.post("/", function (req, res, next) {
  const { nama, pekerjaan, usia } = req.body

  res.json({
    message: "Data berhasil dikirimkan",
    data: {
      nama,
      pekerjaan,
      usia,
    },
  })
})

module.exports = router
