const productModel = require("../models/productModels")

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.getAllProducts()
    return res.status(200).json(products)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Gagal mengambil produk" })
  }
}

const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id)
    return res.status(200).json(product)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Gagal mengambil produk" })
  }
}

const addProduct = async (req, res) => {
  let { name, description, price, stock, image_url } = req.body
  price = Number(price)
  stock = Number(stock)

  if (!name || !description || !price || !stock) {
    new Error("All fields are required")
  }

  try {
    await productModel.addProduct({
      name,
      description,
      price,
      stock,
      image_url,
    })
    res.status(200).json("Product berhasil ditambahkan")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const updateProduct = async (req, res) => {
  let { name, description, price, stock, image_url } = req.body
  const id = req.params.id
  price = Number(price)
  stock = Number(stock)

  if (!name || !description || !price || !stock) {
    new Error("All fields are required")
  }

  try {
    await productModel.updateProduct(id, {
      name,
      description,
      price,
      stock,
      image_url,
    })
    res.status(200).json("Product berhasil diubah")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { getAllProduct, getProductById, addProduct, updateProduct }
