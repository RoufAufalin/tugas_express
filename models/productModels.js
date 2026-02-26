const fs = require("fs").promises
const path = require("path")
const data = path.join(__dirname, "../data/data.json")
const productsPath = path.join(__dirname, "../data/products.json")

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectID

const ProductSchema = new Schema({
  // id: ObjectID,
  name: String,
  description: String,
  stock: Number,
  price: Number,
  image_url: String,
  product_id: Number,
})

const productModel = {
  getAllProducts: async () => {
    const all_products = await fs.readFile(productsPath, "utf-8")
    return JSON.parse(all_products)
  },

  getProductById: async (id) => {
    const all_products = await fs.readFile(productsPath, "utf-8")

    const products = JSON.parse(all_products)

    const product = products.find((p) => p.id == id)

    return product
  },

  addProduct: async (newProduct) => {
    const file = await fs.readFile(productsPath, "utf-8")
    const products = JSON.parse(file)

    const id = products[products.length - 1].id + 1
    newProduct.id = id

    products.push(newProduct)

    await fs.writeFile(productsPath, JSON.stringify(products, null, 2))

    return newProduct
  },
  updateProduct: async (id, updatedProduct) => {
    const file = await fs.readFile(productsPath, "utf-8")
    const products = JSON.parse(file)

    const product = products.find((product) => product.id == id)

    // mengubah data produk
    product.name = updatedProduct.name
    product.description = updatedProduct.description
    product.price = updatedProduct.price
    product.stock = updatedProduct.stock
    product.image_url = updatedProduct.image_url

    await fs.writeFile(productsPath, JSON.stringify(products, null, 2))

    return updatedProduct
  },
};

const Product = mongoose.model('Product', ProductSchema)

module.exports = productModel, Product;
