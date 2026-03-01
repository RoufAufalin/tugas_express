const mongoose = require("mongoose")
const Product = require("../models/productModels")
const { setServers } = require("node:dns/promises")
const dotenv = require("dotenv").config()

setServers(["1.1.1.1", "8.8.8.8"])

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected")
  })
  .catch((err) => console.error(err))

module.exports = mongoose
