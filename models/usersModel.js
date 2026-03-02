const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { HashPassword, comparePassword } = require("../helper/pass")
const { generateToken } = require("../helper/token")

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" },
)

UserSchema.pre("save", async function () {
  // when using async hooks in mongoose, simply throw on failure
  if (this.isModified("password")) {
    this.password = await HashPassword(this.password)
  }
})

const User = mongoose.model("Users", UserSchema)

const usersModel = {
  register: async (userData) => {
    try {
      const user = await User.create(userData)
      return user
    } catch (err) {
      console.error("Gagal Register: ", err)
      throw err
    }
  },
  login: async (userData) => {
    const { username, password } = userData
    try {
      const user = await User.findOne({ username })
      if (!user) {
        const err = new Error("User not found")
        err.status = 404
        throw err
      }

      const isMatched = await comparePassword(password, user.password)
      if (!isMatched) {
        const err = new Error("Invalid username or password")
        err.status = 401
        throw err
      }

      const token = await generateToken({ username })
      const result =
        typeof user.toObject === "function" ? user.toObject() : { ...user }
      result.token = token
      user.token = await generateToken({ username, password })
      return result
    } catch (err) {
      console.error("Gagal Login: ", err)
      throw err
    }
  },
}

module.exports = usersModel
