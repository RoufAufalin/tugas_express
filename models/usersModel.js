const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { HashPassword, comparePassword } = require("../helper/pass")
const { generateToken } = require("../helper/token")

const UserSchema = new Schema(
  {
    email: {
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
    const { email, password } = userData
    try {
      const user = await User.findOne({ email })
      if (!user) {
        const err = new Error("User not found")
        err.status = 404
        throw err
      }

      const isMatched = await comparePassword(password, user.password)
      if (isMatched) {
        const token = await generateToken({
          id: user._id.toString(),
          email: user.email,
        })
        return { id: user._id, email: user.email, token }
      } else {
        const err = new Error("Invalid email or password")
        err.status = 401
        throw err
      }
    } catch (err) {
      console.error("Gagal Login: ", err)
      throw err
    }
  },
}

module.exports = usersModel
