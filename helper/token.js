const jwt = require("jsonwebtoken")
const secret = "supersecretbanget"

async function generateToken(payload) {
  return jwt.sign(payload, secret)
}

module.exports = { generateToken }
