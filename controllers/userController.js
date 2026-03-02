const userModel = require("../models/usersModel")
const createError = require("http-errors")

const register = async (req, res, next) => {
  const { username, password } = req.body

  const data = {
    username,
    password,
  }

  if (!username || !password) {
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
  const { username, password } = req.body

  const data = {
    username,
    password,
  }

  if (!username || !password) {
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
