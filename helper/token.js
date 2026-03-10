const jwt = require("jsonwebtoken")
const secret = process.env.SUPER_SECRET_KEY

async function generateToken(payload) {
  return jwt.sign(payload, secret)
}

async function decodeToken(token) {
  try {
    const decodedToken = jwt.verify(token, secret)
    console.log(decodedToken)
    return decodedToken
  } catch (err) {
    throw err
  }
}

module.exports = { generateToken, decodeToken }
