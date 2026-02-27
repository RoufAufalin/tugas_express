const mongoose = require("mongoose")
const Product = require('../models/productModels')
const { setServers } = require('node:dns/promises')

setServers(["1.1.1.1", "8.8.8.8"])

mongoose.connect('mongodb+srv://roufaufal_db_user:9ipLidyChKh8smu3@kada.dromhtu.mongodb.net/kada')
    .then(() => {
        console.log("Database Connected")
    })
    .catch((err) => console.error(err))


module.exports = mongoose