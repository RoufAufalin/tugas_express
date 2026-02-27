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
      const result = Product.findByIdAndUpdate(id, updatedData, {
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
}

// const productModel = {
//   getAllProducts: async () => {
//     const all_products = await fs.readFile(productsPath, "utf-8")
//     return JSON.parse(all_products)
//   },

//   getProductById: async (id) => {
//     const all_products = await fs.readFile(productsPath, "utf-8")

//     const products = JSON.parse(all_products)

//     const product = products.find((p) => p.id == id)

//     return product
//   },

//   addProduct: async (newProduct) => {
//     const file = await fs.readFile(productsPath, "utf-8")
//     const products = JSON.parse(file)

//     const id = products[products.length - 1].id + 1
//     newProduct.id = id

//     products.push(newProduct)

//     await fs.writeFile(productsPath, JSON.stringify(products, null, 2))

//     return newProduct
//   },
//   updateProduct: async (id, updatedProduct) => {
//     const file = await fs.readFile(productsPath, "utf-8")
//     const products = JSON.parse(file)

//     const product = products.find((product) => product.id == id)

//     // mengubah data produk
//     product.name = updatedProduct.name
//     product.description = updatedProduct.description
//     product.price = updatedProduct.price
//     product.stock = updatedProduct.stock
//     product.image_url = updatedProduct.image_url

//     await fs.writeFile(productsPath, JSON.stringify(products, null, 2))

//     return updatedProduct
//   },
// };

;((module.exports = productModel), Product)
