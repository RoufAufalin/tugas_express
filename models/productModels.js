const fs = require("fs").promises
const path = require("path")
const data = path.join(__dirname, "../data/data.json")
const productsPath = path.join(__dirname, "../data/products.json")

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    stock: Number,
    price: Number,
    image_url: String,
    id: Number,
  },
  { collection: "product" },
)

const Product = mongoose.model("Product", ProductSchema)

const productModel = {
  getAllProducts: async () => {
    try {
      const allProduct = await Product.find({})
      console.log(allProduct)
      return allProduct
    } catch (err) {
      console.log(err)
    }
  },
  addProduct: async (newProduct) => {
    try {
      const totalData = await Product.countDocuments()

      const newId = totalData + 1

      newProduct.id = newId

      const savedProduct = await Product.create(newProduct)

      return savedProduct
    } catch (err) {
      console.error("Gagal Menambah Data: ", err)
    }
  },
  getProductById: async (id) => {
    try {
      const product = await Product.find({ id })
      console.log(product)
      return product
    } catch (err) {
      console.log(err)
    }
  },
  updateProduct: async (id, updatedData) => {
    try {
      const result = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidator: true,
      })

      if (!result) {
        console.log("Produk tidak ditemukan")
        return
      }

      console.log("Data berhasil diupdate:", result)
    } catch (err) {
      console.error(err)
    }
  },
  deleteProduct: async (id) => {
    try {
      const product = await Product.findByIdAndDelete(id)

      if (!product) {
        console.log("Data not found")
        return null
      } else {
        console.log("Data successfully deleted", product)
        return product
      }
    } catch (err) {
      console.log("Error: ", err)
      throw err
    }
  },
}

module.exports = productModel
