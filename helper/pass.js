const bcrypt = require("bcryptjs")

async function HashPassword(pass) {
  const hashedPass = await bcrypt.hash(pass, 10)
  return hashedPass
}

async function comparePassword(pass, hashedPass) {
  return bcrypt.compare(pass, hashedPass)
}

module.exports = { HashPassword, comparePassword }
