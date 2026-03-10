const userModel = require("../models/usersModel")
const createError = require("http-errors")

const register = async (req, res, next) => {
  const { email, password } = req.body

  const data = {
    email,
    password,
  }

  if (!email || !password) {
    return next(createError(400, "All fields are required"))
  }

  try {
    const registUser = await userModel.register(data)
    return res
      .status(200)
      .json({ status: "Berhasil Register", data: registUser })
  } catch (err) {
    return next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  console.log(`Ini adalah ${email} dan ${password}`)

  const data = {
    email,
    password,
  }

  if (!email || !password) {
    return next(createError(400, "All fields are required"))
  }

  try {
    const loginUser = await userModel.login(data)
    return res.status(200).json({ status: "Berhasil Login", data: loginUser })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  register,
  login,
}
